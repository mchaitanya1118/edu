import { Module } from '@nestjs/common';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { CampusesController } from './campuses.controller';
import { CampusesService } from './campuses.service';
import { PrismaService } from '../common/database/prisma.service';
import { JwtAuthGuard } from '../common/guards';

@Module({
  imports: [],
  controllers: [SchoolsController, CampusesController],
  providers: [SchoolsService, CampusesService, PrismaService, JwtAuthGuard],
  exports: [SchoolsService, CampusesService],
})
export class SchoolsModule {}
