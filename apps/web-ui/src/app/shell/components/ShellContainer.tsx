import { FunctionComponent, useEffect } from 'react';
import { useRootDispatch, useRootSelector } from '../../state';
import { selectIsLoadingSettings, selectSettings, SettingsActions, SettingsModel } from '../../settings';
import { Auth0Provider } from '@auth0/auth0-react';
import { ShellWithAuth } from './ShellWithAuth';
import { ShellLoading } from './ShellLoading';
import axios from 'axios';

export const ShellContainer: FunctionComponent = () => {
  const dispatch = useRootDispatch();
  const isLoadingSettings = useRootSelector(selectIsLoadingSettings);
  const settings = useRootSelector(selectSettings);

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
                   redirectUri={window.location.origin}>
      <ShellWithAuth />
    </Auth0Provider>
  );
};
