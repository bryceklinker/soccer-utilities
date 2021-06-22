import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { SoccerThemeProvider } from '@soccer-utilities/common-ui';
import { Provider } from 'react-redux';

import { ShellContainer } from './app/shell';
import { configureRootStore } from './app/state';

const store = configureRootStore();
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
        <SoccerThemeProvider>
          <BrowserRouter>
            <ShellContainer />
          </BrowserRouter>
        </SoccerThemeProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
