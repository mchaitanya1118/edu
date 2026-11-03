import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards';
import { CampusesService, CampusDto } from './campuses.service';

@Controller('schools/:schoolId/campuses')
@UseGuards(JwtAuthGuard)
export class CampusesController {
  constructor(private readonly service: CampusesService) {}

  @Get()
  async findAll(@Param('schoolId') schoolId: string) {
    return { data: await this.service.findBySchool(schoolId) };
  }

  @Post()
  async create(@Param('schoolId') schoolId: string, @Body() dto: CampusDto) {
    const data = await this.service.create(schoolId, dto);
    return { data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: CampusDto) {
    const data = await this.service.update(id, dto);
    return { data };
  }
}
