import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      // No roles specified, allow access
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      // No user object found, deny access
      return false;
    }

    // Check if the user has any of the required roles
    return requiredRoles.some((role) => user.role === role);
  }
}
