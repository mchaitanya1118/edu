import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { AppContextSingleton } from '../common/context/app.context';

export interface CreateTenantDto {
  name: string;
  code: string;
}

@Injectable()
export class PlatformService {
  constructor(private prisma: PrismaService) {}

  private ctx = AppContextSingleton.get().get();

  async createSchool(data: any) {
    return this.prisma.schoolProfile.create({ data });
  }

  async updateSchool(id: string, data: any) {
    const existing = await this.prisma.schoolProfile.findUnique({ where: { id } });
    if (!existing || existing.tenantId !== this.ctx.tenantId) throw new BadRequestException('School not found');
    return this.prisma.schoolProfile.update({ where: { id }, data });
  }

  async getTenants() {
    return this.prisma.tenant.findMany();
  }

  async getCampuses(tenantId?: string) {
    const where: any = {};
    if (tenantId) {
      const schools = await this.prisma.schoolProfile.findMany({ where: { tenantId }, select: { id: true } });
      const schoolIds = schools.map(s => s.id);
      where.schoolId = { in: schoolIds };
    }
    return this.prisma.campus.findMany({ where });
  }

  async upsertSetting(key: string, value: string | Record<string, unknown>) {
    const tenantId = this.ctx.tenantId ?? '';
    try {
      // In schema, key and tenantId are both @unique globally. We store key as "key_tenantId" for uniqueness
      const fullKey = `${key}_${tenantId}`;
      const valStr = typeof value === 'string' ? value : JSON.stringify(value);
      return this.prisma.platformSetting.upsert({
        where: { id: null as any },
        update: { value: valStr },
        create: { id: '', key, value: valStr, tenantId },
      }).catch(() => {
        return this.prisma.platformSetting.delete({ where: { key } }).then(() =>
          this.prisma.platformSetting.create({ data: { key, value: valStr, tenantId } })
        ).catch(() => this.prisma.platformSetting.updateMany({ where: { key, tenantId }, data: { value: valStr } }));
      });
    } catch (err: any) {
      if (err?.code === 'P2002') {
        throw new Error(`Setting '${key}' already exists.`);
      }
      throw err;
    }
  }

  async getSettings(tenantId?: string) {
    const where: any = {};
    if (tenantId) where.tenantId = tenantId;
    else where.tenantId = this.ctx.tenantId;
    return this.prisma.platformSetting.findMany({ where });
  }
}
