import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';
import { AuthService } from './auth-service';
import { RolesGuard } from './roles-guard';
import { JwtGuard } from './jwt-guard';

@Module({
  imports: [ConfigModule, PassportModule.register({ defaultStrategy: 'jwt' }), ],
  providers: [JwtStrategy, AuthService, RolesGuard, JwtGuard, Logger],
  exports: [PassportModule, AuthService, RolesGuard],
})
export class NestAuth0Module {}
