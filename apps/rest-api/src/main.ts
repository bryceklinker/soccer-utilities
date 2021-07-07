import {Context, HttpRequest} from '@azure/functions';
import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AzureHttpAdapter } from '@nestjs/azure-func-http';

import { AppModule } from './app/app.module';
import { JwtGuard } from '@soccer-utilities/nest-auth0';
import * as appInsights from 'applicationinsights';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const isAzureFunction = process.env.IS_AZURE_FUNCTION && Boolean(process.env.IS_AZURE_FUNCTION);

async function createApp(): Promise<INestApplication> {
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

async function createAzureApp(): Promise<INestApplication> {
  const app = await createApp();
  app.setGlobalPrefix('api');
  return await app.init();
}

async function createLocalApp(): Promise<INestApplication> {
  const app = await createApp();
  const port = process.env.PORT || 3333;
  return await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/');
  })
}

function azureFunctionHandler(context: Context, req: HttpRequest) {
  appInsights.setup().start();
  AzureHttpAdapter.handle(createAzureApp, context, req);
}

export default azureFunctionHandler;

if (!isAzureFunction) {
  createLocalApp().catch(err => {
    console.error(err);
  })
}
