import { INestApplication, Logger } from '@nestjs/common';
import { createApp } from './shared-main';

export async function createLocalApp(): Promise<INestApplication> {
  const app = await createApp();
  const port = process.env.PORT || 3333;
  return await app.listen(port, () => {
    const logger = app.get(Logger);
    logger.log('Listening at http://localhost:' + port + '/');
  });
}
