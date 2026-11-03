import { Module } from '@nestjs/common';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { PrismaService } from '../common/database/prisma.service';
import { JwtAuthGuard } from '../common/guards';

@Module({
  imports: [],
  controllers: [AuditController],
  providers: [AuditService, PrismaService, JwtAuthGuard],
  exports: [AuditService],
})
export class AuditModule {}
