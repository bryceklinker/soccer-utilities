import { TestingServer } from '@soccer-utilities/testing-support';
import { createRestApi } from './rest-api';
import { RestRequest } from 'msw';

describe('RestApi', () => {
  test('when rest api created then get uses base url', async () => {
    TestingServer.setupGet('https://bill.com/this/is/a/path', { id: 'data' });

    const restApi = createRestApi('https://bill.com');
    const result = await restApi.get('/this/is/a/path');

    expect(result).toEqual({ id: 'data' });
  });

  test('when rest api created then post uses base url', async () => {
    TestingServer.setupPost('https://bill.com/my/path', { id: 'posted' });

    const restApi = createRestApi('https://bill.com');
    const result = await restApi.post('/my/path');

    expect(result).toEqual({ id: 'posted' });
  });

  test('when rest api used to post then sends body to api', async () => {
    let request: RestRequest | null = null;
    TestingServer.setupPost('https://bill.com/my/post', undefined, {
      captureRequest: (req) => (request = req),
    });

    const restApi = createRestApi('https://bill.com');
    await restApi.post('/my/post', { id: 'data' });

    expect(request.body).toEqual({ id: 'data' });
  });

  test('when rest api used to post with access token then uses access token in authorization', async () => {
    let request: RestRequest | null = null;
    TestingServer.setupPost('https://sue.com/my/post', undefined, {
      captureRequest: (req) => (request = req),
    });

    const restApi = createRestApi('https://sue.com', 'my-token');
    await restApi.post('my/post');

    expect(request.headers.get('Authorization')).toEqual('Bearer my-token');
  });

  test('when rest api used to get with access token then uses access token in authorization', async () => {
    let request: RestRequest | null = null;
    TestingServer.setupGet('https://sue.com/my/resource', undefined, {
      captureRequest: (req) => (request = req),
    });

    const restApi = createRestApi('https://sue.com', 'other-token');
    await restApi.get('my/resource');

    expect(request.headers.get('Authorization')).toEqual('Bearer other-token');
  });
});
