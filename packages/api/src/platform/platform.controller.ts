import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards';
import { PlatformService } from './platform.service';
import { AppContextSingleton } from '../common/context/app.context';

export interface PlatformSettingsInput {
  [key: string]: string | number | boolean | Record<string, unknown>;
}

@Controller('platform')
@UseGuards(JwtAuthGuard)
export class PlatformController {
  constructor(private readonly service: PlatformService) {}

  @Get('settings')
  async getSettings(@Query('tenantId') tenantId?: string) {
    const settings = await this.service.getSettings(tenantId);
    return { data: settings };
  }

  @Post('settings')
  async setSettings(@Body() input: PlatformSettingsInput) {
    const ctx = AppContextSingleton.get().get();
    for (const [k, v] of Object.entries(input)) {
      await this.service.upsertSetting(k, typeof v === 'string' ? v : JSON.stringify(v));
    }
    return { data: input };
  }

  @Get('settings/:key')
  async getSetting(@Param('key') key: string) {
    const settings = await this.service.getSettings();
    const found = settings.find((s: any) => s.key === key);
    return { data: found ?? null };
  }
}
