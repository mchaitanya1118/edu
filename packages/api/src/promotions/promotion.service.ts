import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '../common/database/prisma.service';
import { AppContextSingleton } from '../common/context/app.context';

export interface CreatePromotionDto {
  name: string;
  description?: string;
  discountType: 'PERCENTAGE' | 'AMOUNT' | 'MATERIAL_FEE_WAIVER';
  discountValue: string; // Decimal as string
  maxDiscount?: string;
  minEligibleFee?: string;
  stackPolicy?: string;
  terms?: string;
  internalNotes?: string;
  documentId?: string;
  scheduleEnabled?: boolean;
  startTime?: string;
  endTime?: string;
  effectiveDate?: string;
  expiredDate?: string;
  planPrice?: string;
}

export type UpdatePromotionDto = Partial<CreatePromotionDto>;

@Injectable()
export class PromotionService {
  constructor(private prisma: PrismaService) {}

  private ctx = AppContextSingleton.get().get();

  async create(dto: CreatePromotionDto) {
    const data: any = {
      tenantId: this.ctx.tenantId,
      name: dto.name,
      description: dto.description ?? undefined,
      discountType: (dto.discountType || 'PERCENTAGE') as any,
      discountValue: new Decimal(dto.discountValue),
      maxDiscount: dto.maxDiscount ? new Decimal(dto.maxDiscount) : null,
      minEligibleFee: dto.minEligibleFee ? new Decimal(dto.minEligibleFee) : null,
      stackPolicy: dto.stackPolicy ?? 'BEST_ELIGIBLE',
      terms: dto.terms ?? undefined,
      internalNotes: dto.internalNotes ?? undefined,
      documentId: dto.documentId ?? undefined,
      scheduleEnabled: dto.scheduleEnabled ?? false,
      startTime: dto.startTime ? new Date(dto.startTime) : null,
      endTime: dto.endTime ? new Date(dto.endTime) : null,
      effectiveDate: dto.effectiveDate ? new Date(dto.effectiveDate) : null,
      expiredDate: dto.expiredDate ? new Date(dto.expiredDate) : null,
      planPrice: dto.planPrice ? new Decimal(dto.planPrice) : null,
    };
    return this.prisma.promotion.create({ data });
  }

  async findAll() {
    return this.prisma.promotion.findMany({
      where: { tenantId: this.ctx.tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.promotion.findUnique({
      where: { id },
      include: { document: true },
    });
  }

  async update(id: string, dto: Partial<UpdatePromotionDto>) {
    const data: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(dto)) {
      if (value === undefined) continue;
      if (['discountValue', 'maxDiscount', 'minEligibleFee', 'planPrice'].includes(key) && typeof value === 'string') {
        data[key] = new Decimal(value);
      } else if (['startTime', 'endTime', 'effectiveDate', 'expiredDate'].includes(key) && typeof value === 'string') {
        data[key] = new Date(value);
      } else if (['scheduleEnabled'].includes(key)) {
        data[key] = !!value;
      } else {
        data[key] = value;
      }
    }
    return this.prisma.promotion.update({ where: { id }, data });
  }

  async submitForVerification(id: string) {
    return this.prisma.promotion.update({
      where: { id },
      data: { status: 'PENDING_VERIFICATION' as any, verificationStatus: 'PENDING' as any },
    });
  }

  async verify(id: string, byId: string = '', byName: string = '') {
    return this.prisma.promotion.update({
      where: { id },
      data: {
        verificationStatus: 'VERIFIED' as any,
        verifiedById: byId || undefined,
        verifiedByName: byName || undefined,
        verifiedAt: new Date(),
      },
    });
  }

  async reject(id: string, _byId: string, _byName: string) {
    return this.prisma.promotion.update({
      where: { id },
      data: {
        verificationStatus: 'REJECTED' as any,
        rejectedById: _byId,
        rejectedByName: _byName,
        rejectedAt: new Date(),
      },
    });
  }

  async publish(id: string) {
    return this.prisma.promotion.update({
      where: { id },
      data: { status: 'SCHEDULED' as any },
    });
  }

  async pause(id: string) {
    return this.prisma.promotion.update({ where: { id }, data: { status: 'PAUSED' as any } });
  }

  async resume(id: string) {
    return this.prisma.promotion.update({ where: { id }, data: { status: 'SCHEDULED' as any } });
  }

  async expire(id: string) {
    return this.prisma.promotion.update({ where: { id }, data: { status: 'EXPIRED' as any } });
  }

  async duplicate(id: string) {
    const existing = await this.prisma.promotion.findUnique({ where: { id } });
    if (!existing) return null;
    return this.prisma.promotion.create({ data: { ...existing, id: undefined, createdAt: undefined, updatedAt: undefined } });
  }

  async archive(id: string) {
    return this.prisma.promotion.update({ where: { id }, data: { status: 'EXPIRED' as any } });
  }

  async toggleSchedule(id: string) {
    const existing = await this.prisma.promotion.findUnique({ where: { id } });
    if (!existing) return null;
    return this.prisma.promotion.update({
      where: { id },
      data: { scheduleEnabled: !existing.scheduleEnabled },
    });
  }
}
