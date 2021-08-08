import { AuthService } from './auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/models/users/dto/user-enum';

export const ROLES_KEY = 'roles';
export const Roles = (roles: any[]) => SetMetadata(ROLES_KEY, roles);
export const USER_KEY = 'user';
export const ROLE_PUBLIC = 'PUBLIC';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredRoles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context).getContext();
    const headers = ctx.req.headers;
    if (!headers?.authorization) {
      return false;
    }

    ctx[USER_KEY] = this.authService.validateToken(headers.authorization);

    // allow any auth with admin
    if (ctx[USER_KEY].roles?.includes(Role.ADMIN)) {
      return true;
    }

    return requiredRoles.some(role => ctx[USER_KEY].roles?.includes(role));
  }
}
