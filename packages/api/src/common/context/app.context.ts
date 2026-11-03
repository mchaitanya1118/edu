import { Injectable, UnauthorizedException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ResponseEntity } from '../response/response.entity';

export interface AppContextValue {
  tenantId?: string;
  userId?: string;
  role?: string;
  email?: string;
  agencyId?: string;
}

export const AppContext = {
  set(value: AppContextValue) {
    (AppContext as any).current = value;
  },
  get(): AppContextValue {
    return (AppContext as any).current ?? { tenantId: undefined, userId: undefined, role: undefined, email: undefined };
  },
  reset() {
    delete (AppContext as any).current;
  },
};

@Injectable()
export class AppContextProvider {
  private store = new Map<string, AppContextValue>();

  set(value: AppContextValue) {
    this.store.set('current', value);
  }

  get(): AppContextValue {
    return this.store.get('current') ?? { tenantId: undefined, userId: undefined, role: undefined, email: undefined };
  }

  reset() {
    this.store.delete('current');
  }
}

@Injectable()
export class AppContextSingleton {
  private static instance = new AppContextProvider();

  static get() {
    return this.instance;
  }
}
