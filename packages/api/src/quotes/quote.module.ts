import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { PricingModule } from '../pricing/pricing.module';
import { PromotionModule } from '../promotions/promotion.module';
import { PrismaService } from '../common/database/prisma.service';
import { JwtAuthGuard } from '../common/guards';

@Module({
  imports: [PricingModule, PromotionModule],
  controllers: [QuoteController],
  providers: [QuoteService, PrismaService, JwtAuthGuard],
  exports: [QuoteService],
})
export class QuotesModule {}
