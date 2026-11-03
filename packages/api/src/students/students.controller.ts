import { Controller, Post, Body, Get, Param, UseGuards, Req, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards';
import { StudentsService, CreateStudentDto, CreateLeadDto } from './students.service';
import { AppContextSingleton } from '../common/context/app.context';

@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentsController {
  constructor(private readonly service: StudentsService) {}

  @Post()
  async create(@Body() dto: CreateStudentDto) {
    return { data: await this.service.createStudent(dto) };
  }

  @Get()
  async listForAgency(@Req() req: any) {
    const ctx = AppContextSingleton.get().get();
    const agencyId = ctx.agencyId;
    const all = await this.service.listForAgency(agencyId ?? '');
    return { data: all };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const data = await this.service.findById(id);
    if (!data) return { data: null };
    return { data };
  }

  @Post(':id/leads')
  async createLead(@Param('id') studentId: string, @Body() dto: CreateLeadDto) {
    const data = await this.service.createLead(dto, studentId, dto.source ?? 'MANUAL');
    if (!data) return { data: null };
    return { data };
  }

  @Get(':id/leads')
  async listLeads(@Param('id') studentId: string) {
    return { data: await this.service.listForStudent(studentId) };
  }

  @Post(':id/leads/:leadId/next')
  async advanceLead(@Param('leadId') leadId: string, @Body('status') status: string) {
    const data = await this.service.advanceLead(leadId, status ?? 'CONTACTED');
    if (!data) return { data: null };
    return { data };
  }

  @Post(':id/applications')
  async createApplication(@Param('id') studentId: string, @Body() dto: { courseId: string; intakeLabel: string; leadId?: string; quoteId?: string }) {
    const data = await this.service.createApplication({ studentId, ...dto });
    if (!data) return { data: null };
    return { data };
  }
}
