import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { SoccerThemeProvider } from '@soccer-utilities/common-ui';
import { Provider } from 'react-redux';

import { ShellContainer } from './app/shell';
import { configureRootStore } from './app/state';
import { SettingsActions, SettingsModel } from './app/settings';
import { Auth0Provider } from '@auth0/auth0-react';
import axios from 'axios';

async function loadSettings(): Promise<SettingsModel> {
  const response = await axios.get<SettingsModel>('/assets/settings.json');
  return response.data;
}

function renderWithSettings(settings: SettingsModel) {
  const store = configureRootStore();
  store.dispatch(SettingsActions.load.success(settings));
  const { auth } = settings;
  ReactDOM.render(
    <StrictMode>
      <Provider store={store}>
        <SoccerThemeProvider>
          <BrowserRouter>
            <Auth0Provider domain={auth.domain}
                           clientId={auth.clientId}
                           audience={auth.audience}
                           scope={'openid profile'}
                           redirectUri={window.location.origin}>
              <ShellContainer />
            </Auth0Provider>
          </BrowserRouter>
        </SoccerThemeProvider>
      </Provider>
    </StrictMode>,
    document.getElementById('root')
  );
}

loadSettings()
  .then(renderWithSettings)
  .catch(err => {
    console.error(err);
  })


