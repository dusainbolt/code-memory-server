import { AuthService } from './auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/models/users/dto/user-enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private authService: AuthService) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            return true;
        }
        const ctx = GqlExecutionContext.create(context).getContext().req;
        if (!ctx.headers.authorization) {
            return false;
        }

        ctx.user = this.authService.validateToken(ctx.headers.authorization);
        console.log(ctx.user);
        return requiredRoles.some(role => ctx.user.roles?.includes(role));
    }
}
