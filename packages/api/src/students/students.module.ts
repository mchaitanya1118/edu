import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { PrismaService } from '../common/database/prisma.service';
import { JwtAuthGuard } from '../common/guards';

@Module({
  imports: [],
  controllers: [StudentsController],
  providers: [StudentsService, PrismaService, JwtAuthGuard],
  exports: [StudentsService],
})
export class StudentsModule {}
