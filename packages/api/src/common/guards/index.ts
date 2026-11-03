import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const appContext = (request as any).appContext;
    const requiredRoles = Reflect.getMetadata(ROLES_KEY, context.getHandler()) ?? request.params?.roles;
    if (!requiredRoles || !appContext) return false;
    return requiredRoles.includes((appContext as any).userRole ?? '');
  }
}
