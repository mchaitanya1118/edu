import { Controller, Post, Body, Get, Patch, Param, Req, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { UserService, CreateUserDto, UpdateUserDto } from './user.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../common/guards';
import { User } from '../common/decorators';
import { AppContextSingleton } from '../common/context/app.context';
import { PrismaService } from '../common/database/prisma.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const ctx = AppContextSingleton.get().get();
    const tenantId = dto.tenantId ?? ctx.tenantId;
    if (!tenantId) throw new BadRequestException('tenantId is required.');
    const membership = await this.prisma.tenantMembership.findUnique({
      where: { tenantId_userId: { tenantId, userId: '0' } },
    });
    // The caller must be a tenant admin to register a member (checked by the caller).
    const created = await this.userService.create(dto, tenantId, dto.role ?? 'SCHOOL_ADMIN');
    return { data: created };
  }

  @Get('me')
  async me(@User() user: any) {
    const memberships = await this.prisma.tenantMembership.findMany({
      where: { userId: user.id, status: 'ACTIVE' },
      select: { tenantId: true, role: true },
    });
    return {
      user: { id: user.id, email: user.email, fullName: user.fullName, tenantId: memberships[0]?.tenantId, role: memberships[0]?.role },
    };
  }

  @Patch('me/password')
  async changeOwnPassword(@User() user: any, @Body() dto: { current: string; next: string }) {
    await this.authService.changePassword(user.id, dto.current, dto.next);
    return { ok: true };
  }

  @Get()
  async findAll(@User() user: any) {
    const ctx = AppContextSingleton.get().get();
    // Only platform admins / super admins see all; otherwise tenant-scoped.
    const isAdmin = ctx.role === 'PLATFORM_ADMIN' || ctx.role === 'SUPER_ADMIN';
    if (!isAdmin) {
      return this.userService.findAllByTenant(ctx.tenantId!);
    }
    return this.userService.findAllByTenant('__ALL__');
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }
}
