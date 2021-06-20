import {Context, HttpRequest} from '@azure/functions';
import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AzureHttpAdapter } from '@nestjs/azure-func-http';

import { AppModule } from './app/app.module';
import { JwtGuard } from '@soccer-utilities/nest-auth0';

const isAzureFunction = process.env.IS_AZURE_FUNCTION && Boolean(process.env.IS_AZURE_FUNCTION);

async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalGuards(new JwtGuard());
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
  AzureHttpAdapter.handle(createAzureApp, context, req);
}

export default azureFunctionHandler;

if (!isAzureFunction) {
  createLocalApp().catch(err => {
    console.error(err);
  })
}
