import { Module } from '@nestjs/common';
import { CommissionController } from './commission.controller';
import { CommissionService } from './commission.service';
import { PrismaService } from '../common/database/prisma.service';
import { JwtAuthGuard } from '../common/guards';

@Module({
  imports: [],
  controllers: [CommissionController],
  providers: [CommissionService, PrismaService, JwtAuthGuard],
  exports: [CommissionService],
})
export class CommissionModule {}
