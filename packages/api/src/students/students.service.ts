import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { AppContextSingleton } from '../common/context/app.context';

export interface CreateStudentDto {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  nationality?: string;
  country?: string;
  studyLevel?: string;
  preferredCourse?: string;
  preferredLocation?: string;
  preferredIntake?: string;
  assignedCounselorId?: string;
  notes?: string;
}

export interface CreateLeadDto {
  source: string;
  status?: string;
  notes?: string;
  assignedCounselorId?: string;
}

export interface StudentResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  nationality: string | null;
  studyLevel: string | null;
}

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  private ctx = AppContextSingleton.get().get();
  private tenantId = this.ctx.tenantId!;

  async createStudent(dto: CreateStudentDto) {
    const existing = await this.prisma.student.findFirst({ where: { tenantId: this.tenantId, email: dto.email?.toLowerCase() } });
    if (existing) return existing;
    const student = await this.prisma.student.create({ data: { ...dto, tenantId: this.tenantId, consentGiven: true } });
    return this.findById(student.id);
  }

  async findById(id: string) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student || student.tenantId !== this.tenantId) return null;
    return student;
  }

  async listForAgency(agencyId: string) {
    return this.prisma.student.findMany({
      where: { tenantId: this.tenantId },
      orderBy: { lastName: 'asc' },
    });
  }

  async listForStudent(studentId: string) {
    const s = await this.findById(studentId);
    if (!s || s.tenantId !== this.tenantId) return [];
    return this.prisma.student.findUnique({ where: { id: studentId } })?.leads ?? [];
  }

  async createLead(dto: CreateLeadDto, studentId: string, source: string) {
    const existing = await this.prisma.lead.findUnique({ where: { tenantId_studentId: { tenantId: this.tenantId, studentId } } });
    if (existing) return existing;
    const lead = await this.prisma.lead.create({
      data: {
        studentId,
        agencyId: this.ctx.agencyId!,
        source,
        status: 'NEW',
        notes: dto.notes,
        assignedCounselorId: dto.assignedCounselorId ?? this.ctx.userId,
        tenantId: this.tenantId,
      },
    });
    await this.prisma.student.update({ where: { id: studentId }, data: { consentGiven: true } });
    return lead;
  }

  async advanceLead(leadId: string, status: string) {
    const lead = await this.prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead || lead.tenantId !== this.tenantId) return null;
    return this.prisma.lead.update({
      where: { id: leadId },
      data: { status: status as any, stageHistory: [...lead.stageHistory, status] },
    });
  }

  async createApplication(dto: { studentId: string; courseId: string; intakeLabel: string; leadId?: string; quoteId?: string }) {
    const { studentId, courseId, intakeLabel, leadId, quoteId } = dto;
    const student = await this.prisma.student.findUnique({ where: { id: studentId } });
    if (!student || student.tenantId !== this.tenantId) throw new Error('Student not found.');
    const course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course || course.tenantId !== this.tenantId) throw new Error('Course not found.');
    const intake = intakeLabel
      ? await this.prisma.courseIntake.findUnique({ where: { intakeLabel } })
      : null;
    if (!intake) throw new Error('Intake not found.');
    const app = await this.prisma.application.create({
      data: {
        studentId,
        courseId,
        intakeId: intake.id,
        leadId: leadId ?? null,
        quoteId: quoteId ?? null,
        status: 'NEW',
        tenantId: this.tenantId,
      },
    });
    return app;
  }
}
