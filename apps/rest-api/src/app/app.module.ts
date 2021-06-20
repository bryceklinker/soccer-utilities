import { Module } from '@nestjs/common';
import authConfig from '../config/auth'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NestAuth0Module } from '@soccer-utilities/nest-auth0';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      ignoreEnvVars: false,
      load: [
        authConfig
      ]
    }),
    NestAuth0Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
