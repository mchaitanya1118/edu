import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { PrismaService } from '../common/database/prisma.service';
import { JwtAuthGuard } from '../common/guards';

@Module({
  imports: [],
  controllers: [DocumentsController],
  providers: [DocumentsService, PrismaService, JwtAuthGuard],
  exports: [DocumentsService],
})
export class DocumentsModule {}
