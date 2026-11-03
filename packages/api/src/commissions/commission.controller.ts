import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { CommissionService, CreateCommissionDto, UpdateCommissionDto } from './commission.service';

@Controller('commissions')
export class CommissionController {
  constructor(private readonly service: CommissionService) {}

  @Post()
  async create(@Body() dto: CreateCommissionDto) {
    return this.service.create(dto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.service.findById(id);
    if (!result) throw new Error('Not found');
    return { data: result };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCommissionDto) {
    const result = await this.service.update(id, dto);
    if (!result) throw new Error('Not found');
    return { data: result };
  }

  @Get('agency/:agencyId')
  async getAgencyAgreements(@Param('agencyId') agencyId: string) {
    return this.service.getAgencyAgreements(agencyId);
  }

  @Get('school/:schoolId')
  async getSchoolAgreements(@Param('schoolId') schoolId: string) {
    return this.service.getActiveAgreements(schoolId);
  }
}
