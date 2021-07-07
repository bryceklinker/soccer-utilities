import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestAuth0Module } from '@soccer-utilities/nest-auth0';
import { SchedulesModule } from '@soccer-utilities/schedules-api';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import authConfig from '../config/auth';
import cosmosConfig from '../config/cosmos';
import { SchedulesController } from './schedules/schedules.controller';
import { LoggingMiddleware } from './middleware';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage()
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      ignoreEnvVars: false,
      load: [
        authConfig,
        cosmosConfig
      ]
    }),
    NestAuth0Module,
    SchedulesModule
  ],
  controllers: [
    SchedulesController,
    HealthController
  ],
  providers: [
    Logger
  ]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggingMiddleware)
      .forRoutes({path: '*', method: RequestMethod.ALL});
  }

}
