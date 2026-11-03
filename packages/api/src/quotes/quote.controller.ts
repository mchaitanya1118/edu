import { Controller, Get, Post, Body, Param, UseGuards, Req, Inject } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards';
import { QuoteService, CreateQuoteInput, RecalculateQuoteInput } from './quote.service';
import { Request, Response } from 'express';
import { AppContextSingleton } from '../common/context/app.context';

@Controller('quotes')
@UseGuards(JwtAuthGuard)
export class QuoteController {
  constructor(private readonly service: QuoteService) {}

  @Post()
  async create(@Body() input: CreateQuoteInput) {
    const data = await this.service.createQuote(input);
    return { data };
  }

  @Get()
  async listAgency(@Req() req: Request) {
    const ctx = AppContextSingleton.get().get();
    return { data: await this.service.listForAgency('') };
  }

  @Get('me')
  async listStudent(@Req() req: Request) {
    const ctx = AppContextSingleton.get().get();
    return { data: await this.service.listForStudent(ctx.userId ?? '') };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const data = await this.service.findById(id);
    if (!data) return { data: null };
    return { data };
  }

  @Post(':id/recalculate')
  async recalculate(@Param('id') id: string, @Body() input: RecalculateQuoteInput) {
    const data = await this.service.recalculate(id, input);
    if (!data) return { data: null };
    return { data };
  }

  @Post(':id/pdf')
  async pdf(@Param('id') id: string) {
    const result = await this.service.generatePdf(id);
    return { data: result };
  }
}
