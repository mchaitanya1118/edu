import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { AppContextSingleton } from '../common/context/app.context';

export interface CourseSearchInput {
  query?: string;
  category?: string;
  state?: string;
  city?: string;
  budgetMax?: string;
  commissionMin?: string;
  intakeMonth?: number;
  intakeYear?: number;
  qualification?: string;
  deliveryMode?: string;
  campusId?: string;
  minDuration?: number;
  maxDuration?: number;
  entryRequirementsVerified?: boolean;
  promotionAvailable?: boolean;
  cricoAvailable?: boolean;
  includeArchived?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  private ctx = AppContextSingleton.get().get();

  async search(input: CourseSearchInput) {
    const { page = 1, limit = 20, sortBy = 'relevance', sortDir = 'desc', includeArchived = false, ...whereInput } = input;
    const skip = (page - 1) * limit;

    // Tenant-scoped: the authenticated user belongs to this tenant.
    let where: any = { tenantId: this.ctx.tenantId };
    if (!includeArchived) where.status = 'PUBLISHED';

    const eq: any = {};
    if (input.query) eq.OR = [{ code: input.query }, { name: input.query }, { school: { legalName: input.query } }];
    if (input.category) eq.category = input.category;
    if (input.state) eq.campuses = { some: { state: input.state } };
    if (input.city) eq.campuses = { some: { city: input.city } };
    if (input.budgetMax) eq.fees = { some: { amount: { lte: Number(input.budgetMax) } } };
    if (input.intakeMonth || input.intakeYear) {
      eq.intakes = { some: { month: input.intakeMonth ?? undefined, year: input.intakeYear ?? undefined } };
    }
    if (input.qualification) eq.qualification = input.qualification;
    if (input.deliveryMode) eq.deliveryMode = input.deliveryMode;
    if (input.campusId) eq.campuses = { some: { id: input.campusId } };
    if (input.minDuration) eq.durationMonths = { gte: input.minDuration };
    if (input.maxDuration) eq.durationMonths = { ...eq.durationMonths, lte: input.maxDuration };
    if (input.entryRequirementsVerified) eq.entryRequirements = { not: null };
    if (input.promotionAvailable) eq.promotions = { some: {} };
    if (input.cricoAvailable) eq.cricosCourseCode = { not: null };

    Object.assign(where, eq);

    const [total, courses] = await Promise.all([
      this.prisma.course.count({ where }),
      this.prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: this.buildSort(sortBy, sortDir === 'asc'),
        include: {
          school: { select: { id: true, legalName: true, tradingName: true, cricosCode: true, verificationStatus: true } },
          campuses: { select: { campus: { select: { id: true, name: true, city: true, state: true } } } },
          intakes: { select: { month: true, year: true, intakeLabel: true, status: true, availableSeats: true } },
          fees: { select: { id: true, feeType: true, amount: true, period: true, currency: true, effectiveDate: true, expiredDate: true } },
          promotions: { select: { id: true } },
        },
      }),
    ]);
    return { data: courses, meta: { total, page, limit, hasMore: skip + limit < total } };
  }

  async findById(id: string, includeFees = true) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course || course.tenantId !== this.ctx.tenantId) return null;
    const include: any = {
      school: { select: { id: true, legalName: true, tradingName: true, cricosCode: true, verificationStatus: true } },
      campuses: { select: { id: true, name: true, city: true, state: true, country: true, timezone: true } },
      intakes: { select: { month: true, year: true, intakeLabel: true, description: true, availableSeats: true, status: true } },
      fees: includeFees
        ? { select: { id: true, feeType: true, amount: true, period: true, currency: true, description: true, effectiveDate: true, expiredDate: true } }
        : false,
      promotions: { select: { id: true, name: true, discountType: true, discountValue: true, maxDiscount: true, status: true } },
    };
    const data = await this.prisma.course.findUnique({ where: { id }, include });
    return data;
  }

  async listPublished() {
    return this.prisma.course.findMany({
      where: { tenantId: this.ctx.tenantId, status: 'PUBLISHED' },
      orderBy: { name: 'asc' },
      include: {
        school: { select: { id: true, legalName: true, tradingName: true, cricosCode: true, verificationStatus: true } },
      },
    });
  }

  private buildSort(field: string, ascending: boolean) {
    const map: Record<string, any> = {
      name: { name: ascending ? 'asc' : 'desc' },
      relevance: { name: 'asc' },
      fees: { fees: { _min: { amount: ascending ? 'asc' : 'desc' } } },
      commission: { courses: { _max: {} } },
    };
    return map[field] ?? map.name;
  }
}
