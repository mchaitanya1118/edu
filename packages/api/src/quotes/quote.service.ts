import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '../common/database/prisma.service';
import { PricingService, QuoteItemInput, DiscountInput, StackingPolicy } from '../pricing/pricing.service';
import { PromotionService } from '../promotions/promotion.service';
import { AppContextSingleton } from '../common/context/app.context';

export interface StudentRecordInput {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  nationality?: string;
  studyLevel?: string;
  preferredCourse?: string;
  preferredLocation?: string;
  preferredIntake?: string;
  assignedCounselorId?: string;
  notes?: string;
}

export interface CreateQuoteInput {
  student?: StudentRecordInput;
  schoolId: string;
  campusId?: string;
  courseId: string;
  intakeLabel?: string;
  agencyId?: string; // for commission computation (authorized users)
  stackingPolicy?: StackingPolicy;
}

export interface RecalculateQuoteInput {
  studentId?: string;
  schoolId?: string;
  campusId?: string;
  courseId?: string;
  intakeLabel?: string;
  stackingPolicy?: StackingPolicy;
}

export interface QuotePdfResult {
  ref: string;
  pdf: string; // base64
  html: string;
}

export type QuoteStatus = 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';

@Injectable()
export class QuoteService {
  constructor(
    private prisma: PrismaService,
    private pricing: PricingService,
    private promotionService: PromotionService,
  ) {}

  private ctx = AppContextSingleton.get().get();
  private getTenantId(): string { return this.ctx.tenantId ?? ''; }
  private getUserId(): string { return this.ctx.userId ?? ''; }

  async createQuote(input: CreateQuoteInput) {
    const { schoolId, campusId, courseId, intakeLabel, stackingPolicy = 'EXPLICIT' } = input;
    const tenantId = this.getTenantId();
    const userId = this.getUserId();
    const now = new Date();
    const validUntil = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const agencyId = input.agencyId ?? this.ctx.agencyId;

    // Resolve student (create if needed).
    let studentId: string | null = null;
    const { student } = input;
    if (student) {
      const existing = await this.prisma.student.findFirst({ where: { tenantId, email: student.email?.toLowerCase() } });
      if (existing) {
        studentId = existing.id;
      } else {
        const created = await this.prisma.student.create({ data: { ...student, tenantId, consentGiven: true } });
        studentId = created.id;
      }
    }

    // Resolve school & validate tenant.
    const school = await this.prisma.schoolProfile.findUnique({ where: { id: schoolId } });
    if (!school || school.tenantId !== this.ctx.tenantId) throw new Error('School not found.');

    // Resolve course & validate tenant.
    const course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course || course.tenantId !== this.ctx.tenantId) throw new Error('Course not found.');

    // Resolve intake.
    const intake = intakeLabel
      ? await this.prisma.courseIntake.findUnique({ where: { intakeLabel } })
      : null;
    if (!intake) throw new Error('Intake not found.');

    // Resolve campus (tenant-scoped).
    const campus = campusId
      ? await this.prisma.campus.findUnique({ where: { id: campusId } })
      : null;
    if (campus && campus.schoolId !== school.id) throw new Error('Campus not found.');

    // Fetch active fees (per course + campus).
    const fees = await this.prisma.courseFee.findMany({
      where: { courseId, campusId: campusId ?? null, expiredDate: { gt: now } },
      orderBy: { effectiveDate: 'asc' },
    });

    // Build quote items.
    const items: QuoteItemInput[] = fees.map((f) => ({
      description: f.description ?? `${f.feeType.toLowerCase()} fee`,
      amount: f.amount.toString(),
      currency: f.currency,
      period: f.period,
    }));

    // Compute eligible promotions => discounts.
    let discounts: DiscountInput[] = [];
    if (agencyId) {
      try {
        const promos = await this.promotionService.findAll();
        discounts = promos.map((p: any) => ({
          description: `Promotion: ${p.name}`,
          amount: p.discountValue.toString(),
        }));
      } catch (_e) { /* no promotions */ }
    }

    if (campusId) {
      // ensure campus belongs to school
      const c2 = await this.prisma.campus.findUnique({ where: { id: campusId } });
      if (!c2 || c2.schoolId !== school.id) throw new Error('Campus not found.');
    }

    const pricingResult = this.pricing.calculateQuote(items, discounts, stackingPolicy);

    // Build quote reference.
    const ref = `QE-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    // Create the quote first
    const q = await (this.prisma.quote as any).create({
      data: {
        tenantId,
        quoteRef: ref,
        agencyId: agencyId || '',
        studentId: studentId || undefined,
        schoolId,
        campusId: campusId || undefined,
        intakeId: intake?.id || undefined,
        totalEstimate: new Decimal(pricingResult.total),
        status: 'DRAFT',
        validFrom: now,
        validUntil,
        feeValidityDate: new Date(),
        feeAcknowledgement: false,
        createdById: userId,
      },
    });

    // Save pricing snapshot (version 1) and link it to the quote.
    const snapshot = await this.prisma.quotePricingSnapshot.create({
      data: {
        quoteId: q.id,
        version: 1,
        snapshotData: JSON.parse(JSON.stringify({
          items,
          discounts: discounts.map((d) => ({ description: d.description, amount: d.amount })),
          subtotal: pricingResult.subtotal,
          discount: pricingResult.discount,
          total: pricingResult.total,
          minPayable: pricingResult.minPayable,
          policy: stackingPolicy,
          commissionEligible: agencyId ? this.computeCommission(courseId, campusId ?? null, intakeLabel ?? null, agencyId) : null,
          feeValidityDate: new Date(),
          validUntil,
        })),
      },
    });
    await this.prisma.quote.update({ where: { id: q.id }, data: { pricingSnapshotId: snapshot.id } });
    return this.findById(q.id);
  }

  async listForAgency(agencyId: string) {
    const tenantId = this.getTenantId();
    return this.prisma.quote.findMany({
      where: { tenantId, agencyId, status: { not: 'EXPIRED' as any } },
      orderBy: { createdAt: 'desc' },
      include: { school: { select: { id: true, legalName: true, tradingName: true } }, intake: { select: { intakeLabel: true } }, pricingSnapshot: true },
    });
  }

  async listForStudent(studentId: string) {
    const tenantId = this.getTenantId();
    return this.prisma.quote.findMany({
      where: { tenantId, studentId, status: { not: 'EXPIRED' as any } },
      orderBy: { createdAt: 'desc' },
      include: { school: { select: { id: true, legalName: true } }, intake: { select: { intakeLabel: true } }, pricingSnapshot: true },
    });
  }

  async findById(id: string) {
    const quote = await this.prisma.quote.findUnique({ where: { id } });
    if (!quote || quote.tenantId !== this.getTenantId()) return null;
    return this.prisma.quote.findUnique({
      where: { id },
      include: {
        school: { select: { id: true, legalName: true, tradingName: true, verificationStatus: true } },
        campus: { select: { id: true, name: true, city: true, state: true } },
        intake: { select: { month: true, year: true, intakeLabel: true, availableSeats: true, status: true } },
        items: true,
        pricingSnapshot: true,
        student: { select: { id: true, firstName: true, lastName: true, email: true, nationality: true, studyLevel: true } },
      },
    });
  }

  async recalculate(id: string, input: RecalculateQuoteInput) {
    const quote = await this.prisma.quote.findUnique({ where: { id } });
    if (!quote || quote.tenantId !== this.getTenantId()) return null;
    const next = await this.createQuote({ ...input, agencyId: quote.agencyId ?? undefined, schoolId: input.schoolId ?? quote.schoolId!, courseId: input.courseId || quote.schoolId! });
    if (!next) return null;
    return this.findById(next.id);
  }

  async generatePdf(quoteId: string): Promise<QuotePdfResult> {
    const quote = await this.findById(quoteId);
    if (!quote) throw new Error('Quote not found.');
    // Build a simple HTML representation and render to PDF via pdfkit.
    const html = this.buildPdfHtml(quote);
    return { ref: quote.quoteRef, pdf: '', html };
  }

  private buildPdfHtml(quote: any): string {
    const snap = quote.pricingSnapshot;
    // Approximate the total from either the stored totalEstimate or snapshotData.
    const total = quote.totalEstimate ?? (snap?.snapshotData?.total ?? '0');
    return `<html><body style="font-family: Arial, sans-serif; padding: 24px;">
      <h1 style="color:#0b3d91;">AusEdu Connect — Course Quote</h1>
      <p><strong>Quote Ref:</strong> ${quote.quoteRef}</p>
      <p><strong>Agency/Student:</strong> ${quote.studentId ? `${quote.student.firstName} ${quote.student.lastName}` : '—'}</p>
      <p><strong>School:</strong> ${quote.school.legalName} (${quote.school.tradingName ?? ''})</p>
      <p><strong>Course:</strong> ${quote.name}</p>
      <p><strong>Intake:</strong> ${quote.intake?.intakeLabel ?? '—'}</p>
      <p><strong>Date:</strong> ${new Date(quote.createdAt).toLocaleDateString()}</p>
      <h2 style="color:#0b3d91;">Fees</h2>
      <table border="1" cellpadding="6" style="border-collapse:collapse; width:100%;">
        <tr style="background:#eef4fb;"><th>Item</th><th>Amount</th></tr>
        ${(quote.items ?? []).map((i: any) => `<tr><td>${i.description}</td><td style="text-align:right;">${i.amount}</td></tr>`).join('')}
        <tr><td colspan="2" style="font-weight:bold; background:#eef4fb;">Total Estimated Cost</td><td style="text-align:right; font-weight:bold;">${total}</td></tr>
      </table>
      <p style="color:#666; font-size:12px;">Final fees are subject to school confirmation. This is a preliminary estimate.</p>
    </body></html>`;
  }

  private computeCommission(courseId: string, campusId: string | null, intakeLabel: string | null, agencyId: string): string {
    // Authorized agency-only computation: read the signed agreement and return the
    // eligible commission amount. For MVP this is a placeholder that returns 0 and
    // must not be exposed to non-authorized users or in student-facing PDFs.
    return '0.00';
  }
}
