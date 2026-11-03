import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';

export interface CampusDto {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postcode: string;
  country?: string;
  timezone?: string;
}

@Injectable()
export class CampusesService {
  constructor(private prisma: PrismaService) {}

  async findBySchool(schoolId: string) {
    return this.prisma.campus.findMany({ where: { schoolId }, orderBy: { name: 'asc' } });
  }

  async create(schoolId: string, dto: CampusDto) {
    return this.prisma.campus.create({
      data: { schoolId, ...dto },
    });
  }

  async update(id: string, dto: Partial<CampusDto>) {
    return this.prisma.campus.update({ where: { id }, data: dto as Record<string, unknown> });
  }

  async delete(id: string) {
    return this.prisma.campus.delete({ where: { id } });
  }
}
