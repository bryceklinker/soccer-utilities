import { INestApplication } from '@nestjs/common';
import { startApp } from '../../testing/start-app';
import axios from 'axios';
import { constants } from 'http2';

describe('Health Api', () => {
  let app: INestApplication;
  let baseUrl: string;

  beforeEach(async () => {
    app = await startApp();
    baseUrl = await app.getUrl();
  })

  test('when getting health then returns ok', async () => {
    const response = await axios.get(`${baseUrl}/.health`);

    expect(response.status).toEqual(constants.HTTP_STATUS_OK);
  });

  afterEach(async () => {
    await app.close();
  })
});
