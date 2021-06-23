import { FunctionComponent, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useRootDispatch, useRootSelector } from '../../state';
import { ShellLoading } from './ShellLoading';
import { AuthActions } from '../../auth';
import { ShellView } from './ShellView';
import { selectApplicationUser } from '../../auth/state/auth-selectors';

export const ShellContainer: FunctionComponent = () => {
  const dispatch = useRootDispatch();
  const applicationUser = useRootSelector(selectApplicationUser);
  const {isLoading, isAuthenticated, handleRedirectCallback, user, loginWithRedirect, getAccessTokenSilently} = useAuth0();

  useEffect(() => {
    if (isLoading || user) {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('code')) {
      handleRedirectCallback().catch(err => console.error(err));
    } else {
      loginWithRedirect().catch(err => console.error(err));
    }
  }, [isLoading, handleRedirectCallback, user, loginWithRedirect, applicationUser, dispatch]);

  useEffect(() => {
    (async function syncUserWithState() {
      dispatch(AuthActions.loadUser.request());
      const accessToken = await getAccessTokenSilently();
      dispatch(AuthActions.loadUser.success({...user, accessToken}));
    })();
  }, [user, dispatch])

  if (isLoading || !isAuthenticated || !user) {
    return <ShellLoading />;
  }

  return <ShellView />
};
