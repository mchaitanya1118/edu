import { Controller, Get, Param, Query, UseGuards, Req, Inject } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards';
import { CoursesService } from './courses.service';
import { Request } from 'express';
import { PrismaService } from '../common/database/prisma.service';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CoursesController {
  constructor(
    private readonly service: CoursesService,
    @Inject(PrismaService) private readonly prismaService: PrismaService,
  ) {}

  @Get()
  async search(@Query() query: Record<string, string>, @Req() req: Request) {
    const input: any = {};
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== 'undefined' && v !== '') input[k] = v;
    });
    return this.service.search(input as any);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const data = await this.service.findById(id);
    if (!data) return { data: null };
    return { data };
  }

  @Get(':id/pricing-history')
  async pricingHistory(@Param('id') id: string) {
    const ctx = this.service['ctx'];
    const course = await this.service.findById(id, false);
    if (!course || course.tenantId !== ctx.tenantId) return { data: [] };
    return { data: await this.prismaService.pricingHistory.findMany({ where: { courseId: id }, orderBy: { version: 'desc' } }) };
  }
}
