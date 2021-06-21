import '@testing-library/jest-dom';
import { SettingsServer } from './settings-server';


beforeAll(() => {
  SettingsServer.start();
})

beforeEach(() => {
  SettingsServer.reset();
})

afterAll(() => {
  SettingsServer.stop();
})
