import { Injectable as NestInjectable } from '@nestjs/common';
import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppContext } from './app.context';

@Injectable()
export class AppContextMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'] as string | undefined;
    const userId = req.headers['x-user-id'] as string | undefined;
    const userRole = req.headers['x-user-role'] as string | undefined;
    const userEmail = req.headers['x-user-email'] as string | undefined;
    if (process.env.NODE_ENV !== 'production' && (tenantId || userId)) {
      AppContext.set({ tenantId: tenantId ?? undefined, userId: userId ?? undefined, role: userRole ?? undefined, email: userEmail ?? undefined });
    }
    next();
  }
}
