import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    if (!process.env.DATABASE_URL) {
      process.env.DATABASE_URL = 'postgresql://aus_edu:aus_edu_dev_password@localhost:5432/aus_edu';
    }
    super({
      log: [
        { level: 'error', emit: 'event' },
        { level: 'warn', emit: 'event' },
      ],
      errorFormat: 'minimal',
    });
    (this as any).$on('error', (e: unknown) => this.logger.error('Prisma error', e));
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (err) {
      this.logger.warn(`Database connection unavailable at startup: ${(err as Error).message}`);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
