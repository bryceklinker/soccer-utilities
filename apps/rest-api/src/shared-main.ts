import { INestApplication } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { WinstonModule } from 'nest-winston';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import * as winston from 'winston';
import { JwtGuard } from '@soccer-utilities/nest-auth0';
import * as packageJson from '../package.json';

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

  const config = new DocumentBuilder()
    .setTitle('Soccer Utilities Api')
    .setDescription('Utilities for Bondurant Soccer Club Treasurer')
    .setVersion(packageJson.version)
    .addTag('Schedules')
    .addTag('Referees')
    .addTag('Health')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  return app;
}
