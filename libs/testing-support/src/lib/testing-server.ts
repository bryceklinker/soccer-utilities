import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { TestingRequestOptions } from './testing-request-options';
import { HttpStatusCodes } from './http-status-codes';

const DEFAULT_REQUEST_CAPTURE = () => {};

const server = setupServer();

function start() {
  server.listen();
}

function stop() {
  server.close();
}

function reset() {
  server.resetHandlers();
}

function setupGet<T>(
  url: string,
  response: T,
  options: TestingRequestOptions = {
    status: HttpStatusCodes.OK,
    captureRequest: DEFAULT_REQUEST_CAPTURE,
  }
): void {
  server.use(
    rest.get(url, (req, res, ctx) => {
      options.captureRequest(req);
      return res(
        ctx.status(options.status),
        ctx.delay(options.delay || 0),
        ctx.json(response)
      );
    })
  );
}

function setupPost<TResponse>(
  url: string,
  response?: TResponse,
  options: TestingRequestOptions = {
    status: HttpStatusCodes.OK,
    captureRequest: DEFAULT_REQUEST_CAPTURE,
  }
): void {
  server.use(
    rest.post(url, (req, res, ctx) => {
      const transformers = [
        ctx.status(response ? options.status : HttpStatusCodes.Created),
        ctx.delay(options.delay || 0),
        ...(response ? [ctx.json(response)] : []),
      ];
      options.captureRequest(req);
      return res(...transformers);
    })
  );
}

export const TestingServer = {
  start,
  stop,
  reset,
  setupGet,
  setupPost,
};
