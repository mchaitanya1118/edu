import { Module } from '@nestjs/common';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';
import { PrismaService } from '../common/database/prisma.service';
import { JwtAuthGuard } from '../common/guards';

@Module({
  imports: [],
  controllers: [PromotionController],
  providers: [PromotionService, PrismaService, JwtAuthGuard],
  exports: [PromotionService],
})
export class PromotionModule {}
