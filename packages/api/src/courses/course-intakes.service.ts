import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';

export interface IntakeDto {
  month: number;
  year: number;
  description?: string;
  availableSeats?: number;
  status?: string;
}

@Injectable()
export class CourseIntakesService {
  constructor(private prisma: PrismaService) {}

  async findByCourse(courseId: string) {
    return this.prisma.courseIntake.findMany({
      where: { courseId },
      orderBy: { year: 'desc' },
    });
  }

  async create(courseId: string, dto: IntakeDto) {
    const label = `${dto.year}-${String(dto.month).padStart(2, '0')}`;
    const existing = await this.prisma.courseIntake.findFirst({
      where: { intakeLabel: label, courseId },
    });
    if (existing) return existing;
    return this.prisma.courseIntake.create({
      data: { courseId, month: dto.month, year: dto.year, intakeLabel: label, description: dto.description, availableSeats: dto.availableSeats ?? 1, status: dto.status ?? 'OPEN' },
    });
  }
}
