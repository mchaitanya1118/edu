import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';

export interface CreateTenantDto {
  slug: string;
  name: string;
  plan?: string;
  settings?: Record<string, unknown>;
}

export interface UpdateTenantDto {
  name?: string;
  plan?: string;
  status?: string;
  branding?: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTenantDto, adminUserId: string) {
    const slug = dto.slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    const tenant = await this.prisma.tenant.create({
      data: {
        slug,
        name: dto.name,
        plan: (dto.plan as any) ?? 'DEVELOPER',
        settings: (dto.settings ?? {}) as any,
        subscription: undefined,
      },
    });
    await this.prisma.tenantMembership.create({
      data: { userId: adminUserId, tenantId: tenant.id, role: 'SUPER_ADMIN', status: 'ACTIVE', acceptedAt: new Date() },
    });
    return this.findById(tenant.id);
  }

  async findById(id: string) {
    return this.prisma.tenant.findUnique({ where: { id } });
  }

  async findAll() {
    return this.prisma.tenant.findMany({ orderBy: { name: 'asc' } });
  }

  async update(id: string, dto: UpdateTenantDto) {
    const set: Record<string, unknown> = {};
    if (dto.name !== undefined) set.name = dto.name;
    if (dto.plan !== undefined) set.plan = dto.plan;
    if (dto.status !== undefined) set.status = dto.status;
    if (dto.branding !== undefined) set.branding = dto.branding;
    if (dto.settings !== undefined) set.settings = dto.settings;
    return this.prisma.tenant.update({ where: { id }, data: set });
  }

  async suspend(id: string, byUserId: string) {
    await this.prisma.tenant.update({
      where: { id },
      data: { status: 'SUSPENDED' },
    });
    await this.prisma.auditLog.create({
      data: { tenantId: id, userId: byUserId, action: 'TENANT_SUSPEND', entityType: 'TENANT', entityId: id },
    });
  }

  async reactivate(id: string, byUserId: string) {
    await this.prisma.tenant.update({
      where: { id },
      data: { status: 'ACTIVE' },
    });
    await this.prisma.auditLog.create({
      data: { tenantId: id, userId: byUserId, action: 'TENANT_REACTIVATE', entityType: 'TENANT', entityId: id },
    });
  }

  async countByStatus() {
    return this.prisma.tenant.groupBy({
      by: ['status'],
      _count: true,
    });
  }
}
