import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtGuard, NestAuth0Module } from '@soccer-utilities/nest-auth0';
import { SchedulesModule } from '@soccer-utilities/schedules-api';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import authConfig from '../config/auth';
import cosmosConfig from '../config/cosmos';
import { SchedulesController } from './schedules/schedules.controller';
import { LoggingMiddleware } from './middleware';
import { HealthController } from './health/health.controller';
import { RefereesController } from './referees/referees.controller';
import { TimesheetsApiModule } from '@soccer-utilities/timesheets-api';
import { TimesheetsController } from './timesheets/timesheets.controller';
import { APP_GUARD } from '@nestjs/core';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      ignoreEnvVars: false,
      load: [authConfig, cosmosConfig],
    }),
    NestAuth0Module,
    SchedulesModule,
    TimesheetsApiModule,
  ],
  controllers: [
    SchedulesController,
    HealthController,
    RefereesController,
    TimesheetsController,
    UsersController,
  ],
  providers: [
    Logger,
    {
      provide: APP_GUARD,
      useExisting: JwtGuard,
    },
    JwtGuard,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
