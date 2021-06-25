import '@testing-library/jest-dom';
import { TestingRestApiServer } from './testing-rest-api-server';

beforeAll(() => {
  TestingRestApiServer.start();
})

beforeEach(() => {
  TestingRestApiServer.reset();
})

afterAll(() => {
  TestingRestApiServer.stop();
})
