import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';

export interface CreateMembershipDto {
  userId: string;
  role: string;
  status?: string;
}

@Injectable()
export class MembershipService {
  constructor(private prisma: PrismaService) {}

  async findActiveByUser(userId: string) {
    return this.prisma.tenantMembership.findFirst({
      where: { userId, status: 'ACTIVE' },
      select: { tenantId: true, role: true },
    });
  }

  async create(dto: CreateMembershipDto, tenantId: string) {
    const existing = await this.prisma.tenantMembership.findUnique({
      where: { tenantId_userId: { tenantId, userId: dto.userId } },
    });
    if (existing) return this.update(existing.id, { role: dto.role, status: 'ACTIVE' });
    return this.prisma.tenantMembership.create({
      data: { userId: dto.userId, tenantId, role: dto.role as any, status: 'ACTIVE', acceptedAt: new Date() },
    });
  }

  async findById(id: string) {
    return this.prisma.tenantMembership.findUnique({ where: { id } });
  }

  async listByTenant(tenantId: string) {
    return this.prisma.tenantMembership.findMany({
      where: { tenantId, status: 'ACTIVE' },
      include: { user: { select: { id: true, email: true, fullName: true } } },
      orderBy: { user: { fullName: 'asc' } },
    });
  }

  async update(id: string, data: { role?: string; status?: string; permission?: string }) {
    return this.prisma.tenantMembership.update({ where: { id }, data: data as any });
  }

  async remove(tenantId: string, userId: string) {
    return this.prisma.tenantMembership.deleteMany({ where: { tenantId, userId } });
  }
}
