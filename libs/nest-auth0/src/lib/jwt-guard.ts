import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ALLOW_ANONYMOUS_META_KEY } from './allow-anonymous';
import { AuthService } from './auth-service';
import { Request } from 'express';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAnonymousAllowed =
      this.reflector.get<boolean>(
        ALLOW_ANONYMOUS_META_KEY,
        context.getHandler()
      ) ||
      this.reflector.get<boolean>(ALLOW_ANONYMOUS_META_KEY, context.getClass());

    if (isAnonymousAllowed) {
      return true;
    }

    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest<Request>();
    if (!result) {
      return false;
    }

    request.user = {
      ...request.user,
      ...(await this.authService.getUser(request.user['sub'])),
    };
    return true;
  }
}
