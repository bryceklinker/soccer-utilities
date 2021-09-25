import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role';
import { UserModel } from '@soccer-utilities/models';
import { REQUIRED_ROLES_KEY } from './required-roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      REQUIRED_ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles) {
      return true;
    }

    const user: UserModel = context.switchToHttp().getRequest().user;
    return (
      requiredRoles.some((role) => user.roles.some((r) => r.name === role)) ||
      user.roles.some((r) => r.name === Role.admin)
    );
  }
}
