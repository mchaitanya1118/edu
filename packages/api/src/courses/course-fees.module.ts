import { Module } from '@nestjs/common';
import { CourseFeesController } from './course-fees.controller';
import { CourseFeesService } from './course-fees.service';
import { PrismaService } from '../common/database/prisma.service';
import { JwtAuthGuard } from '../common/guards';

@Module({
  imports: [],
  controllers: [CourseFeesController],
  providers: [CourseFeesService, PrismaService, JwtAuthGuard],
  exports: [CourseFeesService],
})
export class CourseFeesModule {}
