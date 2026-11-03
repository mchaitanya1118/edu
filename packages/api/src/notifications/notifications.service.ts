import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { AppContextSingleton } from '../common/context/app.context';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  private ctx = AppContextSingleton.get().get();
  private getTenantId(): string { return this.ctx.tenantId ?? ''; }

  async notify(userId: string, type: 'PUBLICATION' | 'APPLICATION' | 'FEES' | 'OTHER', data: unknown) {
    const tenantId = this.getTenantId();
    return this.prisma.notification.create({
      data: {
        tenantId,
        userId,
        title: typeof data === 'object' ? ((data as any).title ?? 'Notification') : 'Notification',
        body: typeof data === 'object' ? ((data as any).body ?? '') : '',
        type: type as any,
        data: typeof data === 'object' ? JSON.parse(JSON.stringify(data)) : null,
        read: false,
      },
    });
  }

  async markRead(notificationId: string) {
    return this.prisma.notification.update({ where: { id: notificationId }, data: { read: true } });
  }

  async listForUser(userId: string, limit: number = 50) {
    const tenantId = this.getTenantId();
    return this.prisma.notification.findMany({
      where: { userId, tenantId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}
