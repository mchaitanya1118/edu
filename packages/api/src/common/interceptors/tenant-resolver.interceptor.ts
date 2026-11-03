import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '../database/prisma.service';
import { AppContextSingleton } from '../context/app.context';

export interface RequestExt extends Request {
  appContext: { tenant?: any; user?: any };
}

@Injectable()
export class TenantResolverInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const user = req.user as { id?: string; email?: string } | undefined;
    if (user?.id) {
      const membership = await this.prisma.tenantMembership.findFirst({
        where: { userId: user.id, status: 'ACTIVE' },
        select: { tenantId: true, role: true },
      });
      AppContextSingleton.get().set({
        tenantId: membership?.tenantId,
        userId: user.id,
        role: membership?.role,
        email: user.email,
      });
    } else {
      AppContextSingleton.get().set({ tenantId: undefined, userId: undefined, role: undefined, email: undefined });
    }
    return next.handle();
  }
}
