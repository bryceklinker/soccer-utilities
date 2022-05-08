import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Router } from 'react-router-dom';
import { SoccerThemeProvider } from '@soccer-utilities/common-ui';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import { ShellContainer } from './app/shell';
import { Auth0Provider } from '@auth0/auth0-react';
import axios from 'axios';
import { SettingsModel } from './app/settings/state/settings-model';
import { configureRootStore } from './app/state/configure-root-store';
import { SettingsActions } from './app/settings/state/settings-actions';
import { WebLogger } from './app/logging/web-logger';

async function loadSettings(): Promise<SettingsModel> {
  const response = await axios.get<SettingsModel>('/assets/settings.json');
  WebLogger.configure(response.data);
  return response.data;
}

function renderWithSettings(settings: SettingsModel) {
  const store = configureRootStore();
  store.dispatch(SettingsActions.load.success(settings));
  const { auth } = settings;
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <Provider store={store}>
      <SoccerThemeProvider>
        <BrowserRouter>
          <Auth0Provider
            domain={auth.domain}
            clientId={auth.clientId}
            audience={auth.audience}
            scope={'openid profile'}
            redirectUri={window.location.origin}
          >
            <ShellContainer />
          </Auth0Provider>
        </BrowserRouter>
      </SoccerThemeProvider>
    </Provider>
  );
}

loadSettings()
  .then(renderWithSettings)
  .catch((err) => {
    console.error(err);
  });
