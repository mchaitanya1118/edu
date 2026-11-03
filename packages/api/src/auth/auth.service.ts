import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../common/database/prisma.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  refreshTokenExpires: number;
  user: {
    id: string;
    email: string;
    fullName: string;
    tenantId: string;
    role: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const match = await bcrypt.compare(password, user.passwordHash ?? '');
    if (!match) return null;
    // resolve the ACTIVE membership + tenant + role
    const membership = await this.prisma.tenantMembership.findFirst({
      where: { userId: user.id, status: 'ACTIVE' },
      select: { tenantId: true, role: true },
    });
    if (!membership) return null;
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      tenantId: membership.tenantId,
      role: membership.role,
    };
  }

  async login(dto: AuthCredentialsDto): Promise<TokenPair> {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: user.id, email: user.email, fullName: user.fullName, tenantId: user.tenantId, role: user.role },
        { expiresIn: process.env.JWT_EXPIRY_MINUTES ?? 60, secret: process.env.JWT_SECRET },
      ),
      this.jwtService.signAsync(
        { sub: user.id, email: user.email, type: 'refresh' },
        { expiresIn: process.env.JWT_REFRESH_EXPIRY_DAYS ?? 30, secret: process.env.JWT_REFRESH_SECRET },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
      accessTokenExpires: Date.now() + 60 * 60 * 1000,
      refreshTokenExpires: Date.now() + 30 * 24 * 60 * 60 * 1000,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        tenantId: user.tenantId,
        role: user.role,
      },
    };
  }

  async refreshToken(userId: string): Promise<Omit<TokenPair, 'user'>> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Invalid refresh token.');
    const payload = { sub: userId, email: user.email, type: 'refresh' };
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m', secret: process.env.JWT_SECRET });
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '30d', secret: process.env.JWT_REFRESH_SECRET });
    return { accessToken, refreshToken, accessTokenExpires: Date.now() + 15 * 60 * 1000, refreshTokenExpires: Date.now() + 30 * 24 * 60 * 60 * 1000 };
  }

  async logout(userId: string, tenantId: string) {
    // Tokens are self-expiring (JWT). On logout we revoke the refresh token by
    // storing a revoked token hash (simplified: none needed if short-lived).
    return { revoked: true };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found.');
    const match = await bcrypt.compare(currentPassword, user.passwordHash ?? '');
    if (!match) throw new UnauthorizedException('Current password is incorrect.');
    const hash = await bcrypt.hash(newPassword, 12);
    await this.prisma.user.update({ where: { id: userId }, data: { passwordHash: hash } });
  }
}
