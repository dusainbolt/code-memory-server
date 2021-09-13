import { AuthService } from './auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/dto/user/UserEnum';

export const ROLES_KEY = 'roles';
export const Roles = (roles: Role[]) => SetMetadata(ROLES_KEY, roles);
export const USER_KEY = 'user';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get required role
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    // Get context GraphQL
    const ctx = GqlExecutionContext.create(context).getContext();
    const headers = ctx.req.headers;
    if (!headers?.authorization) {
      return false;
    }
    // Set Context for user
    ctx[USER_KEY] = await this.authService.validateToken(headers.authorization);

    // allow any auth with admin
    if (ctx[USER_KEY].roles?.includes(Role.ADMIN)) {
      return true;
    }

    return requiredRoles.some(role => ctx[USER_KEY].roles?.includes(role));
  }
}
