import { Controller, Get, Post, Body, Param, UseGuards, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards';
import { PromotionService, CreatePromotionDto, UpdatePromotionDto } from './promotion.service';

@Controller('promotions')
@UseGuards(JwtAuthGuard)
export class PromotionController {
  constructor(private readonly service: PromotionService) {}

  @Get()
  async findAll() {
    return { data: await this.service.findAll() };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const data = await this.service.findById(id);
    if (!data) return { data: null };
    return { data };
  }

  @Post()
  async create(@Body() dto: CreatePromotionDto) {
    const data = await this.service.create(dto);
    return { data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePromotionDto) {
    const data = await this.service.update(id, dto);
    if (!data) return { data: null };
    return { data };
  }

  @Post(':id/submit')
  async submitForVerification(@Param('id') id: string) {
    const data = await this.service.submitForVerification(id);
    if (!data) return { data: null };
    return { data };
  }

  @Post(':id/verify')
  async verify(@Param('id') id: string) {
    const data = await this.service.verify(id, 'auth', 'System');
    if (!data) return { data: null };
    return { data };
  }

  @Post(':id/publish')
  async publish(@Param('id') id: string) {
    const data = await this.service.publish(id);
    if (!data) return { data: null };
    return { data };
  }

  @Post(':id/pause')
  async pause(@Param('id') id: string) {
    const data = await this.service.pause(id);
    if (!data) return { data: null };
    return { data };
  }

  @Post(':id/resume')
  async resume(@Param('id') id: string) {
    const data = await this.service.resume(id);
    if (!data) return { data: null };
    return { data };
  }

  @Post(':id/expire')
  async expire(@Param('id') id: string) {
    const data = await this.service.expire(id);
    if (!data) return { data: null };
    return { data };
  }

  @Post(':id/reject')
  async reject(@Param('id') id: string) {
    const data = await this.service.reject(id, 'auth', 'System');
    if (!data) return { data: null };
    return { data };
  }

  @Post(':id/duplicate')
  async duplicate(@Param('id') id: string) {
    const data = await this.service.duplicate(id);
    if (!data) return { data: null };
    return { data };
  }

  @Post(':id/archive')
  async archive(@Param('id') id: string) {
    const data = await this.service.archive(id);
    if (!data) return { data: null };
    return { data };
  }

  @Post(':id/schedule')
  async schedule(@Param('id') id: string) {
    const data = await this.service.toggleSchedule(id);
    if (!data) return { data: null };
    return { data };
  }
}
