import { FunctionComponent, useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useRootDispatch } from '../../state';
import { AuthActions } from '../../auth';
import { ShellView } from './ShellView';
import { ShellLoading } from './ShellLoading';

export const ShellWithAuth: FunctionComponent = withAuthenticationRequired(() => {
  const dispatch = useRootDispatch();
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async function waitForToken() {
      dispatch(AuthActions.loadUser.request());
      const accessToken = await getAccessTokenSilently();
      const action = accessToken
        ? AuthActions.loadUser.success({ ...user, accessToken })
        : AuthActions.loadUser.success(null);
      dispatch(action);
    })();
  }, [user, getAccessTokenSilently, dispatch]);

  if (!isAuthenticated) {
    return <ShellLoading />;
  }

  return <ShellView />;
});
