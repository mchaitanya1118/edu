import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { AppContextSingleton } from '../common/context/app.context';

export interface CreateCommissionDto {
  agencyId: string;
  schoolId: string;
  agreementReference?: string;
  commissionType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  commissionValue: string;
  commissionBasis?: string;
  basisJson?: unknown;
  effectiveStart: string;
  effectiveEnd?: string;
  eligibleIntakes?: string[];
  paymentMilestones?: unknown;
  minimumSpend?: string;
  documentId?: string;
  status?: string;
  notes?: string;
}

export interface UpdateCommissionDto {
  agreementReference?: string;
  commissionType?: string;
  commissionValue?: string;
  commissionBasis?: string;
  basisJson?: unknown;
  effectiveStart?: string;
  effectiveEnd?: string;
  eligibleIntakes?: string[];
  paymentMilestones?: unknown;
  minimumSpend?: string;
  documentId?: string;
  status?: string;
  notes?: string;
}

export type CommissionStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'ACTIVE' | 'EXPIRED' | 'TERMINATED';
export type CommissionType = 'PERCENTAGE' | 'FIXED_AMOUNT';

@Injectable()
export class CommissionService {
  constructor(private prisma: PrismaService) {}

  private ctx = AppContextSingleton.get().get();

  async create(dto: CreateCommissionDto) {
    const userId = this.ctx.userId ?? '';
    const tenantId = this.ctx.tenantId ?? '';
    const comm = await this.prisma.agencyCommissionAgreement.create({
      data: {
        tenantId,
        agencyId: dto.agencyId,
        schoolId: dto.schoolId,
        agreementReference: dto.agreementReference ?? undefined,
        commissionType: dto.commissionType as any,
        commissionValue: dto.commissionValue,
        commissionBasis: dto.commissionBasis ?? undefined,
        basisJson: dto.basisJson ? JSON.parse(JSON.stringify(dto.basisJson)) : null,
        effectiveStart: new Date(dto.effectiveStart),
        effectiveEnd: dto.effectiveEnd ? new Date(dto.effectiveEnd) : null,
        eligibleIntakes: dto.eligibleIntakes ?? [],
        paymentMilestones: dto.paymentMilestones ? JSON.parse(JSON.stringify(dto.paymentMilestones)) : null,
        minimumSpend: dto.minimumSpend ?? undefined,
        documentId: dto.documentId ?? undefined,
        status: (dto.status ?? 'DRAFT') as any,
        notes: dto.notes ?? undefined,
        createdById: userId,
      },
    });
    return this.findById(comm.id);
  }

  async findById(id: string) {
    const comm = await this.prisma.agencyCommissionAgreement.findUnique({ where: { id } });
    if (!comm || comm.tenantId !== this.ctx.tenantId) return null;
    return this.prisma.agencyCommissionAgreement.findUnique({
      where: { id },
      include: { school: { select: { id: true, legalName: true } }, agency: { select: { id: true, legalName: true, tradingName: true } } },
    });
  }

  async findAll() {
    return this.prisma.agencyCommissionAgreement.findMany({
      where: { tenantId: this.ctx.tenantId },
      orderBy: { effectiveStart: 'desc' },
    });
  }

  async update(id: string, dto: Partial<UpdateCommissionDto>) {
    const comm = await this.prisma.agencyCommissionAgreement.findUnique({ where: { id } });
    if (!comm || comm.tenantId !== this.ctx.tenantId) return null;
    // Build update data with proper type coercion for JSON/enum fields
    const data: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(dto)) {
      if (value === undefined) continue;
      if (['eligibleIntakes', 'basisJson', 'paymentMilestones'].includes(key) && typeof value === 'object') {
        (data as any)[key] = JSON.parse(JSON.stringify(value));
      } else if (['commissionType', 'status'].includes(key)) {
        (data as any)[key] = value as any;
      } else {
        (data as any)[key] = value;
      }
    }
    return this.prisma.agencyCommissionAgreement.update({ where: { id }, data });
  }

  async getActiveAgreements(schoolId: string) {
    const now = new Date();
    return this.prisma.agencyCommissionAgreement.findMany({
      where: {
        tenantId: this.ctx.tenantId,
        schoolId,
        status: 'ACTIVE',
        effectiveStart: { lte: now },
        OR: [{ effectiveEnd: null }, { effectiveEnd: { gt: now } }],
      },
      orderBy: { effectiveStart: 'desc' },
    });
  }

  async getAgencyAgreements(agencyId: string) {
    const now = new Date();
    return this.prisma.agencyCommissionAgreement.findMany({
      where: {
        tenantId: this.ctx.tenantId,
        agencyId,
        status: 'ACTIVE',
        effectiveStart: { lte: now },
        OR: [{ effectiveEnd: null }, { effectiveEnd: { gt: now } }],
      },
      orderBy: { effectiveStart: 'desc' },
    });
  }
}
