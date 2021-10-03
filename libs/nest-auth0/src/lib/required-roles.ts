import { SetMetadata } from '@nestjs/common';
import { Role } from '@soccer-utilities/models';

export const REQUIRED_ROLES_KEY = 'required-roles';
export const RequiredRoles = (...roles: Role[]) =>
  SetMetadata(REQUIRED_ROLES_KEY, roles);
