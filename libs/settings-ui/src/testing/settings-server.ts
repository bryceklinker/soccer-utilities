import {setupServer} from 'msw/node';
import { SettingsModel } from '../lib/settings-model';
import { rest } from 'msw';

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

function setupSettings(model: SettingsModel) {
  server.use(
    rest.get('/settings.json', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(model)
      )
    })
  )
}

export const SettingsServer = {
  start,
  stop,
  reset,
  setupSettings
}
