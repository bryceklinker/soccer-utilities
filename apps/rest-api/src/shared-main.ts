import { INestApplication } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { JwtGuard } from '@soccer-utilities/nest-auth0';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          winston.format.splat(),
          winston.format.metadata(),
          winston.format.json()
        )
      })
    })
  });
  app.enableCors();
  app.useGlobalGuards(new JwtGuard(app.get(Reflector)));
  return app;
}
