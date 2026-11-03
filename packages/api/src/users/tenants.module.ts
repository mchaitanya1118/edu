import { Module } from '@nestjs/common';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { PrismaService } from '../common/database/prisma.service';
import { JwtAuthGuard } from '../common/guards';

@Module({
  imports: [],
  controllers: [TenantsController],
  providers: [TenantsService, PrismaService, JwtAuthGuard],
  exports: [TenantsService],
})
export class TenantsModule {}
