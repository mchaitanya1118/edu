import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PricingService],
  exports: [PricingService],
})
export class PricingModule {}
