import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { AppContextSingleton } from '../common/context/app.context';

export interface CreateAuditDto {
  action: string;
  entityType?: string;
  entityId?: string;
  changes?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuditFilter {
  action?: string;
  entityType?: string;
  entityId?: string;
  limit?: number;
}

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  private ctx = AppContextSingleton.get().get();

  async create(dto: CreateAuditDto) {
    const tenantId = this.ctx.tenantId ?? '';
    const userId = this.ctx.userId ?? undefined;
    return this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: dto.action as any,
        entityType: dto.entityType ?? undefined,
        entityId: dto.entityId ?? undefined,
        changes: dto.changes ? JSON.parse(JSON.stringify(dto.changes)) : null,
        ipAddress: dto.ipAddress ?? undefined,
        userAgent: dto.userAgent ?? undefined,
      },
    });
  }

  async list(filter: AuditFilter = {}) {
    const where: Record<string, unknown> = { tenantId: this.ctx.tenantId };
    if (filter.action) where.action = filter.action as any;
    if (filter.entityType) where.entityType = filter.entityType;
    if (filter.entityId) where.entityId = filter.entityId;
    const limit = filter.limit ?? 100;
    return this.prisma.auditLog.findMany({ where, orderBy: { createdAt: 'desc' }, take: limit });
  }
}
