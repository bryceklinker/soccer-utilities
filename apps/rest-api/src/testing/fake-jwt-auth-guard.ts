import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ALLOW_ANONYMOUS_META_KEY } from '@soccer-utilities/nest-auth0';
import { Reflector } from '@nestjs/core';

@Injectable()
export class FakeJwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext): boolean {
    const isAnonymousAllowed =
      this.reflector.get<boolean>(
        ALLOW_ANONYMOUS_META_KEY,
        context.getHandler()
      ) ||
      this.reflector.get<boolean>(ALLOW_ANONYMOUS_META_KEY, context.getClass());

    if (isAnonymousAllowed) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.header('Authorization');
    const isAuthenticated = Boolean(authHeader);
    if (isAuthenticated) {
      req.user = JSON.parse(authHeader.replace('Bearer ', ''));
    }
    return isAuthenticated;
  }
}
