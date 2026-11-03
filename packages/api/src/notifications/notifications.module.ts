import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { PrismaService } from '../common/database/prisma.service';
import { JwtAuthGuard } from '../common/guards';

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [NotificationsService, PrismaService, JwtAuthGuard],
  exports: [NotificationsService],
})
export class NotificationsModule {}
