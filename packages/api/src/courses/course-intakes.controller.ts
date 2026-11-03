import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards';
import { CourseIntakesService, IntakeDto } from './course-intakes.service';

@Controller('courses/:courseId/intakes')
@UseGuards(JwtAuthGuard)
export class CourseIntakesController {
  constructor(private readonly service: CourseIntakesService) {}

  @Get()
  async findAll(@Param('courseId') courseId: string) {
    return { data: await this.service.findByCourse(courseId) };
  }

  @Post()
  async create(@Param('courseId') courseId: string, @Body() dto: IntakeDto) {
    const data = await this.service.create(courseId, dto);
    return { data };
  }
}
