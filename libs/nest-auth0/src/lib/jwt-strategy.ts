import { PassportStrategy } from '@nestjs/passport';
import {ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa';
import { NestAuth0Config } from './nest-auth0-config';

const DEFAULT_REQUESTS_PER_MINUTE = 5;
const DEFAULT_ALGORITHM = 'RS256';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: config.get<NestAuth0Config>('auth').jwksRequestsPerMinute || DEFAULT_REQUESTS_PER_MINUTE,
        jwksUri: `${config.get<NestAuth0Config>('auth').issuerUrl}.well-known/jwks.json`
      }),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: config.get<NestAuth0Config>('auth').audience,
      issuer: config.get<NestAuth0Config>('auth').issuerUrl,
      algorithms: [DEFAULT_ALGORITHM]
    });
  }

  validate(payload: unknown): unknown {
    return payload;
  }
}
