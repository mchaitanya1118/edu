import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '../common/database/prisma.service';

export interface CreateCourseFeeDto {
  courseId: string;
  campusId?: string;
  feeType: string;
  amount: string;
  currency?: string;
  period: string;
  description?: string;
  effectiveDate?: string;
  expiredDate?: string;
}

@Injectable()
export class CourseFeesService {
  constructor(private prisma: PrismaService) {}

  async findCourseFees(courseId: string) {
    return this.prisma.courseFee.findMany({
      where: { courseId },
      orderBy: { effectiveDate: 'asc' },
    });
  }

  async create(dto: CreateCourseFeeDto) {
    const { campusId, ...data } = dto;
    return (this.prisma.courseFee as any).create({
      data: {
        courseId: data.courseId,
        campusId: campusId ?? undefined,
        feeType: data.feeType as any,
        amount: new Decimal(data.amount),
        currency: data.currency,
        period: data.period as any,
        description: data.description,
        effectiveDate: data.effectiveDate ? new Date(data.effectiveDate) : undefined,
        expiredDate: data.expiredDate ? new Date(data.expiredDate) : undefined,
      },
    });
  }

  async update(id: string, dto: Partial<CreateCourseFeeDto>) {
    const data: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(dto)) {
      if (value === undefined) continue;
      if (key === 'effectiveDate') data[key] = new Date(value as string);
      else if (key === 'expiredDate') data[key] = new Date(value as string);
      else if (key === 'amount') data[key] = new Decimal(value as string);
      else if (key === 'feeType') data[key] = value as any;
      else if (key === 'period') data[key] = value as any;
      else data[key] = value;
    }
    return (this.prisma.courseFee as any).update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.courseFee.delete({ where: { id } });
  }

  async getActive(courseId: string, campusId?: string) {
    const where: any = { courseId };
    if (campusId) where.campusId = campusId;
    where.OR = [{ expiredDate: null }, { expiredDate: { gt: new Date() } }];
    return this.prisma.courseFee.findMany({
      where,
      orderBy: { effectiveDate: 'asc' },
    });
  }
}
