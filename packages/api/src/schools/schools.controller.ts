import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards';
import { SchoolsService, CreateSchoolDto, UpdateSchoolDto, CampusDto, ProviderRegistrationDto } from './schools.service';

@Controller('schools')
@UseGuards(JwtAuthGuard)
export class SchoolsController {
  constructor(private readonly service: SchoolsService) {}

  @Post()
  async create(@Body() dto: CreateSchoolDto) {
    const created = await this.service.create(dto);
    return { data: created };
  }

  @Get()
  async findAll() {
    return { data: this.service.findAll() };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const data = await this.service.findById(id);
    if (!data) return { data: null };
    return { data };
  }

  @Get(':id/related')
  async findByIdWithRelated(@Param('id') id: string) {
    const data = await this.service.findByIdWithRelated(id);
    if (!data) return { data: null };
    return { data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSchoolDto) {
    const data = await this.service.update(id, dto);
    if (!data) return { data: null };
    return { data };
  }

  @Post(':id/campuses')
  async addCampus(@Param('id') id: string, @Body() dto: CampusDto) {
    const data = await this.service.addCampus(id, dto);
    if (!data) return { data: null };
    return { data };
  }

  @Post(':id/registrations')
  async register(@Param('id') id: string, @Body() dto: ProviderRegistrationDto) {
    const data = await this.service.register(dto);
    if (!data) return { data: null };
    return { data };
  }
}
