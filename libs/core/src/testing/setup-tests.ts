import { TestingServer } from '@soccer-utilities/testing-support';

beforeAll(() => {
  TestingServer.start();
});

beforeEach(() => {
  TestingServer.reset();
});

afterAll(() => {
  TestingServer.stop();
});
