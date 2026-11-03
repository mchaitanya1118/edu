import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import * as bcrypt from 'bcrypt';

export interface CreateUserDto {
  email: string;
  fullName: string;
  password: string;
  tenantId?: string;
  role?: string;
}

export interface UpdateUserDto {
  fullName?: string;
  phone?: string;
  avatarUrl?: string;
  email?: string;
  password?: string;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto, tenantId: string, role: string) {
    const hash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: { email: dto.email, fullName: dto.fullName, passwordHash: hash, tenantId },
    });
    await this.prisma.tenantMembership.create({
      data: { userId: user.id, tenantId, role: role as any },
    });
    return this.findById(user.id);
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findAllByTenant(tenantId: string) {
    return this.prisma.user.findMany({
      where: { memberships: { some: { tenantId, status: 'ACTIVE' } } },
      orderBy: { fullName: 'asc' },
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    const set: any = {};
    if (dto.email !== undefined) set.email = dto.email;
    if (dto.fullName !== undefined) set.fullName = dto.fullName;
    if (dto.phone !== undefined) set.phone = dto.phone;
    if (dto.avatarUrl !== undefined) set.avatarUrl = dto.avatarUrl;
    if (dto.password !== undefined && dto.password) set.passwordHash = await bcrypt.hash(dto.password, 12);
    return this.prisma.user.update({ where: { id }, data: set });
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async changePassword(id: string, current: string, next: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new UnauthorizedException('User not found.');
    const ok = await this.verifyPassword(current, user.passwordHash ?? '');
    if (!ok) throw new UnauthorizedException('Current password is incorrect.');
    await this.prisma.user.update({ where: { id }, data: { passwordHash: await this.hashPassword(next) } });
  }

  private verifyPassword(p: string, hash: string) {
    return bcrypt.compare(p, hash).catch(() => false);
  }

  private async hashPassword(p: string) {
    return await bcrypt.hash(p, 10);
  }
}
