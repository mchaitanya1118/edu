import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards';
import { TenantsService, CreateTenantDto, UpdateTenantDto } from './tenants.service';

@Controller('tenants')
@UseGuards(JwtAuthGuard)
export class TenantsController {
  constructor(private readonly service: TenantsService) {}

  @Post()
  async create(@Request() req: any, @Body() dto: CreateTenantDto) {
    const userId = req.user?.id;
    if (!userId) throw new Error('unauthorized');
    return this.service.create(dto, userId);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    return this.service.update(id, dto);
  }

  @Post(':id/suspend')
  @HttpCode(HttpStatus.NO_CONTENT)
  async suspend(@Param('id') id: string, @Request() req: any) {
    await this.service.suspend(id, req.user!.id);
  }

  @Post(':id/reactivate')
  @HttpCode(HttpStatus.NO_CONTENT)
  async reactivate(@Param('id') id: string, @Request() req: any) {
    await this.service.reactivate(id, req.user!.id);
  }

  @Get('stats')
  async stats() {
    return this.service.countByStatus();
  }
}
