import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards';
import { AuditService, AuditFilter, CreateAuditDto } from './audit.service';
import { PrismaService } from '../common/database/prisma.service';

@Controller('audit')
@UseGuards(JwtAuthGuard)
export class AuditController {
  constructor(
    private readonly service: AuditService,
    private prisma: PrismaService,
  ) {}

  @Post()
  async create(@Body() dto: CreateAuditDto) {
    return { data: await this.service.create(dto) };
  }

  @Get()
  async list(@Query() q: AuditFilter) {
    return { data: await this.service.list(q) };
  }

  @Get('actions')
  async actions() {
    return { data: await this.prisma.auditLog.findMany({ distinct: ['action'], orderBy: { action: 'asc' } }) };
  }
}
