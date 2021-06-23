import { FunctionComponent, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useRootDispatch, useRootSelector } from '../../state';
import { ShellLoading } from './ShellLoading';
import { AuthActions } from '../../auth';
import { ShellView } from './ShellView';
import { selectApplicationUser } from '../../auth/state/auth-selectors';

const isCypressTest = !!(window as any).Cypress;

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
    } else if (!isCypressTest) {
      loginWithRedirect().catch(err => console.error(err));
    }
  }, [isLoading, handleRedirectCallback, user, loginWithRedirect]);

  useEffect(() => {
    async function syncUserWithState() {
      dispatch(AuthActions.loadUser.request());
      const accessToken = await getAccessTokenSilently();
      dispatch(AuthActions.loadUser.success({...user, accessToken}));
    }

    function syncCypressUserWithState() {
      const cypressUser = localStorage.getItem('auth0-cypress');
      if (!cypressUser) {
        return;
      }

      const storedUser = JSON.parse(cypressUser);
      dispatch(AuthActions.loadUser.success({
        ...storedUser.body.decodedToken.user,
        accessToken: storedUser.body.access_token
      }))
    }

    if (isCypressTest) {
      syncCypressUserWithState();
    } else {
      syncUserWithState().catch(err => console.error(err));
    }

  }, [user, dispatch])

  if (!applicationUser) {
    return <ShellLoading />;
  }

  return <ShellView />
};
