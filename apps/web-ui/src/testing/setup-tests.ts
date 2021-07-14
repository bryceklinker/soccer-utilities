import '@testing-library/jest-dom';
import { TestingRestApiServer } from './testing-rest-api-server';

beforeAll(() => {
  Object.assign(navigator, {
    clipboard: {
      writeText: jest.fn().mockReturnValue(Promise.resolve())
    }
  })
  TestingRestApiServer.start();
})

beforeEach(() => {
  TestingRestApiServer.reset();
})

afterAll(() => {
  TestingRestApiServer.stop();
})
