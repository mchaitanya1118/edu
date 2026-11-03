import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { AppContextSingleton } from '../common/context/app.context';

export interface CreateSchoolDto {
  legalName: string;
  tradingName?: string;
  registrationNumber?: string;
  cricosCode?: string;
  taxFileNumber?: string;
}

export interface UpdateSchoolDto {
  legalName?: string;
  tradingName?: string;
  registrationNumber?: string;
  cricosCode?: string;
  taxFileNumber?: string;
  verificationStatus?: string;
  verificationNotes?: string;
  deactivationReason?: string;
}

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

export interface ProviderRegistrationDto {
  schoolId: string;
  registrationType: string;
  licenseNumber: string;
  registrationNumber?: string;
  expiresAt?: string;
  status?: string;
}

@Injectable()
export class SchoolsService {
  constructor(private prisma: PrismaService) {}

  private tenantId = AppContextSingleton.get().get().tenantId;

  async create(dto: CreateSchoolDto) {
    const school = await this.prisma.schoolProfile.create({
      data: {
        tenantId: this.tenantId!,
        legalName: dto.legalName,
        tradingName: dto.tradingName,
        registrationNumber: dto.registrationNumber,
        cricosCode: dto.cricosCode,
        taxFileNumber: dto.taxFileNumber,
        verificationStatus: 'PENDING',
      },
    });
    return this.findById(school.id);
  }

  async findById(id: string) {
    const school = await this.prisma.schoolProfile.findUnique({ where: { id } });
    if (!school || school.tenantId !== this.tenantId) return null;
    return this.prisma.schoolProfile.findUnique({
      where: { id },
      include: { addresses: true, registrations: true },
    });
  }

  async findAll() {
    const where: any = { tenantId: this.tenantId };
    return this.prisma.schoolProfile.findMany({ where, orderBy: { legalName: 'asc' } });
  }

  async update(id: string, dto: UpdateSchoolDto) {
    const school = await this.prisma.schoolProfile.findUnique({ where: { id } });
    if (!school || school.tenantId !== this.tenantId) return null;
    return this.prisma.schoolProfile.update({ where: { id }, data: dto as any });
  }

  async addCampus(schoolId: string, dto: CampusDto) {
    const school = await this.prisma.schoolProfile.findUnique({ where: { id: schoolId } });
    if (!school || school.tenantId !== this.tenantId) return null;
    return this.prisma.campus.create({
      data: { schoolId, ...dto },
    });
  }

  async register(dto: ProviderRegistrationDto) {
    const school = await this.prisma.schoolProfile.findUnique({ where: { id: dto.schoolId ?? this.tenantId } });
    if (!school || school.tenantId !== this.tenantId) return null;
    return this.prisma.providerRegistration.create({
      data: {
        schoolId: dto.schoolId ?? this.tenantId,
        registrationType: dto.registrationType,
        licenseNumber: dto.licenseNumber,
        registrationNumber: dto.registrationNumber,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
        status: dto.status ?? 'ACTIVE',
      },
    });
  }

  async suspend(id: string, byUserId: string) {
    await this.prisma.schoolProfile.update({ where: { id }, data: { verificationStatus: 'REJECTED' } });
  }

  async findByIdWithRelated(id: string) {
    const school = await this.prisma.schoolProfile.findUnique({ where: { id } });
    if (!school || school.tenantId !== this.tenantId) return null;
    const [campuses, registrations] = await Promise.all([
      this.prisma.campus.findMany({ where: { schoolId: id }, orderBy: { name: 'asc' } }),
      this.prisma.providerRegistration.findMany({ where: { schoolId: id } }),
    ]);
    return { school, campuses, registrations };
  }
}
