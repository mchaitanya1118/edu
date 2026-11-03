import { Controller, Post, Body, Req, HttpCode, HttpStatus, UseGuards, Get } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards';
import { User } from '../common/decorators';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ResponseEntity } from '../common/response/response.entity';
import { PrismaService } from '../common/database/prisma.service';

export interface AuthMeResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
    tenantId: string;
    role: string;
    memberships: { tenantId: string; role: string }[];
  };
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthCredentialsDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body('refreshToken') refreshToken: string) {
    throw new Error('refresh token endpoint is a placeholder — wire a secure refresh store.');
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    const authHeader = req.headers.authorization as string | undefined;
    if (!authHeader?.startsWith('Bearer ')) {
      return { revoked: true };
    }
    const token = authHeader.split(' ')[1];
    return { revoked: true };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@User() user: any, @Req() req: Request) {
    const memberships = await this.prisma.tenantMembership.findMany({
      where: { userId: user.id, status: 'ACTIVE' },
      select: { tenantId: true, role: true },
    });
    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        tenantId: memberships[0]?.tenantId ?? user.tenantId,
        role: memberships[0]?.role ?? user.role,
        memberships,
      },
    };
  }
}
