import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ALLOW_ANONYMOUS_META_KEY } from './allow-anonymous';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isAnonymousAllowed = this.reflector.get<boolean>(ALLOW_ANONYMOUS_META_KEY, context.getHandler())
      || this.reflector.get<boolean>(ALLOW_ANONYMOUS_META_KEY, context.getClass());

    if (isAnonymousAllowed) {
      return true;
    }

    return super.canActivate(context);
  }
}
