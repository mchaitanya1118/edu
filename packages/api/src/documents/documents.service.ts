import { Injectable, BadRequestException } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { mkdirSync, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { PrismaService } from '../common/database/prisma.service';
import { AppContextSingleton } from '../common/context/app.context';

export interface UploadOptions {
  maxSizeBytes?: number;
  allowMimes?: string[];
  allowExtensions?: string[];
}

export interface MulterCompatibleFile {
  originalname: string;
  mimetype: string;
  size: number;
  buffer?: Buffer;
  path?: string;
}

export const DEFAULT_UPLOAD = {
  maxSizeBytes: 25 * 1024 * 1024,
  allowMimes: ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  allowExtensions: ['.pdf', '.png', '.jpg', '.jpeg', '.doc', '.docx', '.xls', '.xlsx'],
};

@Injectable()
export class DocumentsService {
  private root = process.env.STORAGE_ROOT ?? join(process.cwd(), 'storage');
  private config: UploadOptions & typeof DEFAULT_UPLOAD = { ...DEFAULT_UPLOAD };

  constructor(private prisma: PrismaService) {}

  private ctx = AppContextSingleton.get().get();

  async upload(file: MulterCompatibleFile) {
    if (!file) throw new BadRequestException('No file uploaded.');
    const ext = `.${file.originalname.split('.').pop()?.toLowerCase()}`;
    if (!(this.config.allowMimes || []).includes(file.mimetype)) {
      throw new BadRequestException(`File type ${file.mimetype} is not allowed.`);
    }
    if (file.size > (this.config.maxSizeBytes ?? DEFAULT_UPLOAD.maxSizeBytes)) {
      throw new BadRequestException('File exceeds maximum size.');
    }

    const storageKey = `uploads/${randomBytes(24).toString('hex')}${ext}`;
    const filePath = join(this.root, storageKey);
    if (process.env.NODE_ENV === 'development') {
      mkdirSync(join(this.root, 'uploads'), { recursive: true });
    }

    if (file.buffer) {
      const ws = createWriteStream(filePath);
      ws.write(file.buffer);
      ws.end();
    } else if (file.path) {
      require('fs').renameSync(file.path, filePath);
    }

    return this.prisma.document.create({
      data: {
        tenantId: this.ctx.tenantId as string,
        docType: 'OTHER' as any,
        name: file.originalname,
        storageKey,
        mimeType: file.mimetype,
        mimeGroup: file.mimetype.split('/')[0],
        sizeBytes: file.size,
        uploadedById: this.ctx.userId ?? '',
        uploadedByName: this.ctx.email ?? 'Unknown',
      },
    });
  }

  async getById(id: string) {
    const doc = await this.prisma.document.findUnique({ where: { id } });
    if (!doc || doc.tenantId !== this.ctx.tenantId) throw new BadRequestException('Document not found.');
    return doc;
  }

  async getDownloadUrl(id: string) {
    const doc = await this.getById(id);
    if (process.env.NODE_ENV === 'production' && process.env.S3_ENDPOINT) {
      return `https://${process.env.S3_ENDPOINT.replace(/^(\w+:|^)\/\//, '')}/${doc.storageKey}`;
    }
    return `${process.env.API_BASE_URL ?? 'http://localhost:4000'}/documents/${doc.id}/download`;
  }

  async list(filter: { docType?: string; status?: string; verified?: boolean }) {
    const where: Record<string, unknown> = { tenantId: this.ctx.tenantId };
    if (filter.docType) where.docType = filter.docType;
    if (filter.status) where.status = filter.status;
    if (filter.verified !== undefined) where.verified = filter.verified;
    return this.prisma.document.findMany({ where, orderBy: { uploadedAt: 'desc' } });
  }

  async verify(id: string, verifiedById: string, status: string, notes?: string) {
    const doc = await this.prisma.document.findUnique({ where: { id } });
    if (!doc || doc.tenantId !== this.ctx.tenantId) throw new BadRequestException('Document not found.');
    return this.prisma.document.update({
      where: { id },
      data: {
        verified: status === 'VERIFIED',
        verifiedBy: verifiedById,
        verifiedAt: new Date(),
        verificationNotes: notes ?? null,
        status: status as any,
      },
    });
  }

  async revoke(id: string) {
    const doc = await this.prisma.document.findUnique({ where: { id } });
    if (!doc || doc.tenantId !== this.ctx.tenantId) throw new BadRequestException('Document not found.');
    return this.prisma.document.update({ where: { id }, data: { verified: false, status: 'PENDING' as any } });
  }
}
