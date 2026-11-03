import { Module } from '@nestjs/common';
import { CourseIntakesController } from './course-intakes.controller';
import { CourseIntakesService } from './course-intakes.service';
import { PrismaService } from '../common/database/prisma.service';
import { JwtAuthGuard } from '../common/guards';

@Module({
  imports: [],
  controllers: [CourseIntakesController],
  providers: [CourseIntakesService, PrismaService, JwtAuthGuard],
  exports: [CourseIntakesService],
})
export class CourseIntakesModule {}
