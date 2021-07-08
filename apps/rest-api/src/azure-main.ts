import { INestApplication } from '@nestjs/common';
import { createApp } from './shared-main';

export async function createAzureApp(): Promise<INestApplication> {
  const app = await createApp();
  app.setGlobalPrefix('api');
  return await app.init();
}
