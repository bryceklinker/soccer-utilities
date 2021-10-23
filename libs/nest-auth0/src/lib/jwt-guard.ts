import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ALLOW_ANONYMOUS_META_KEY } from './allow-anonymous';
import { AuthService } from './auth-service';
import { Request } from 'express';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly logger: Logger
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
    this.logger.log('Result of can activate', result);
    if (!result) {
      return false;
    }

    const request = context.switchToHttp().getRequest<Request>();
    request.user = {
      ...request.user,
      ...(await this.authService.getUser(request.user['sub'])),
    };
    return true;
  }
}
