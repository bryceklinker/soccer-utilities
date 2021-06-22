import { FunctionComponent, useCallback, useEffect } from 'react';
import { useRootDispatch, useRootSelector } from '../../state';
import { selectIsLoadingSettings, selectSettings, SettingsActions, SettingsModel } from '../../settings';
import { Auth0Provider } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ShellWithAuth } from './ShellWithAuth';
import { ShellLoading } from './ShellLoading';

export const ShellContainer: FunctionComponent = () => {
  const dispatch = useRootDispatch();
  const isLoadingSettings = useRootSelector(selectIsLoadingSettings);
  const settings = useRootSelector(selectSettings);
  const history = useHistory();

  const handleRedirectCallback = useCallback((appState: any) => {
    history.replace((appState && appState.returnTo) || window.location.pathname);
  }, [history]);

  useEffect(() => {
    if (settings || isLoadingSettings)
      return;

    (async function loadSettings() {
      dispatch(SettingsActions.load.request());
      const response = await axios.get<SettingsModel>('/assets/settings.json');
      dispatch(SettingsActions.load.success(response.data));
    })();
  }, [isLoadingSettings, settings]);

  if (!settings) {
    return <ShellLoading />;
  }

  const { auth } = settings;
  return (
    <Auth0Provider domain={auth.domain}
                   clientId={auth.clientId}
                   audience={auth.audience}
                   scope={'openid profile'}
                   onRedirectCallback={handleRedirectCallback}
                   redirectUri={window.location.origin}>
      <ShellWithAuth />
    </Auth0Provider>
  );
};
