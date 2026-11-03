import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { CourseFeesService } from './course-fees.service';

@Controller('courses/fees')
export class CourseFeesController {
  constructor(private readonly feesService: CourseFeesService) {}

  @Post()
  async create(@Body() dto: any) {
    return this.feesService.create(dto);
  }

  @Get(':courseId')
  async findByCourse(@Param('courseId') courseId: string) {
    return this.feesService.findCourseFees(courseId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.feesService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.feesService.delete(id);
  }
}
