import { Controller, Post, Get, Body, Param, Query, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { DocumentsService } from './documents.service';
import { UploadOptions } from './documents.service';

export interface DocumentFilter {
  docType?: string;
  status?: string;
  verified?: boolean;
}

@Controller('documents')
export class DocumentsController {
  constructor(private readonly service: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Body() opts: UploadOptions, @Query() q: DocumentFilter) {
    // The actual file comes through as req.file in the middleware chain
    // For direct API calls, we return a placeholder response
    return { data: null };
  }

  @Get()
  async list(@Query() q: DocumentFilter) {
    return { data: await this.service.list(q) };
  }

  @Get(':id/download')
  async download(@Param('id') id: string) {
    const url = await this.service.getDownloadUrl(id);
    return { data: { url, documentId: id } };
  }

  @Post(':id/verify')
  async verify(@Param('id') id: string, @Body('status') status: string, @Body('notes') notes?: string) {
    const data = await this.service.verify(id, 'auth', status, notes);
    if (!data) return { data: null };
    return { data };
  }

  @Post(':id/revoke')
  async revoke(@Param('id') id: string) {
    const data = await this.service.revoke(id);
    if (!data) return { data: null };
    return { data };
  }
}
