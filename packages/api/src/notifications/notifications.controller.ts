import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards';
import { NotificationsService } from './notifications.service';
import { AppContextSingleton } from '../common/context/app.context';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get()
  async list(@Param('userId') userId?: string) {
    const ctx = AppContextSingleton.get().get();
    return { data: await this.service.listForUser(userId ?? (ctx.userId ?? '')) };
  }

  @Post(':id/read')
  async markRead(@Param('id') id: string) {
    return { data: await this.service.markRead(id) };
  }

  @Post('read-all')
  async markAllRead() {
    const ctx = AppContextSingleton.get().get();
    const notifications = await this.service.listForUser(ctx.userId ?? '');
    await Promise.all(notifications.map((n: any) => this.service.markRead(n.id)));
    return { data: { count: notifications.length } };
  }
}
