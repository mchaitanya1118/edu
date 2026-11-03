import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../common/database/prisma.service';

export interface JwtPayload {
  sub: string;
  email: string;
  fullName?: string;
  tenantId?: string;
  role?: string;
  type?: 'access' | 'refresh';
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET', 'change-me-in-production'),
      signOptions: { expiresIn: '15m' },
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) throw new UnauthorizedException('User not found.');

    // Resolve tenant + role from the user's ACTIVE membership.
    const membership = await this.prisma.tenantMembership.findFirst({
      where: { userId: user.id, status: 'ACTIVE' },
      select: { tenantId: true, role: true },
    });
    if (!membership) throw new UnauthorizedException('No active tenant membership.');

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      tenantId: membership.tenantId,
      role: membership.role,
      user,
    };
  }
}
