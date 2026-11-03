import { Module } from '@nestjs/common';
import { MembershipsController } from './memberships.controller';
import { MembershipService } from './memberships.service';
import { PrismaService } from '../common/database/prisma.service';
import { JwtAuthGuard } from '../common/guards';

@Module({
  imports: [],
  controllers: [MembershipsController],
  providers: [MembershipService, PrismaService, JwtAuthGuard],
  exports: [MembershipService],
})
export class MembershipsModule {}
