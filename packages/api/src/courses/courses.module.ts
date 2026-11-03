import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CourseFeesController } from './course-fees.controller';
import { CourseFeesService } from './course-fees.service';
import { CourseIntakesController } from './course-intakes.controller';
import { CourseIntakesService } from './course-intakes.service';
import { PrismaService } from '../common/database/prisma.service';
import { JwtAuthGuard } from '../common/guards';

@Module({
  imports: [],
  controllers: [CoursesController, CourseFeesController, CourseIntakesController],
  providers: [CoursesService, CourseFeesService, CourseIntakesService, PrismaService, JwtAuthGuard],
  exports: [CoursesService, CourseFeesService, CourseIntakesService],
})
export class CoursesModule {}
