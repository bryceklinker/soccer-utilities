import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestAuth0Module } from '@soccer-utilities/nest-auth0';
import { SchedulesModule } from '@soccer-utilities/schedules-api';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import authConfig from '../config/auth';
import cosmosConfig from '../config/cosmos';
import { SchedulesController } from './schedules/schedules.controller';

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
    SchedulesController
  ],
  providers: []
})
export class AppModule {
}
