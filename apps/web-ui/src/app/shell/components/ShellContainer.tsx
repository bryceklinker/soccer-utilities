import { FunctionComponent, useCallback, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ShellView } from './ShellView';
import { LoadingIndicator } from '@soccer-utilities/common-ui';
import { Typography } from '@material-ui/core';
import { useRootDispatch, useRootSelector } from '../../state/root-hooks';
import {
  selectAuthUser,
  selectUserRoles,
} from '../../auth/state/auth-selectors';
import { AuthActions } from '../../auth/state/auth-actions';

declare global {
  interface Window {
    Cypress?: unknown;
  }
}

const isCypressTest = !!window.Cypress;

export const ShellContainer: FunctionComponent = () => {
  const dispatch = useRootDispatch();
  const applicationUser = useRootSelector(selectAuthUser);
  const roles = useRootSelector(selectUserRoles);
  const {
    isLoading,
    handleRedirectCallback,
    user,
    loginWithRedirect,
    getAccessTokenSilently,
    logout,
  } = useAuth0();

  useEffect(() => {
    if (isLoading || user) {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('code')) {
      handleRedirectCallback().catch((err) => console.error(err));
    } else if (!isCypressTest) {
      loginWithRedirect().catch((err) => console.error(err));
    }
  }, [isLoading, handleRedirectCallback, user, loginWithRedirect]);

  useEffect(() => {
    async function syncUserWithState() {
      dispatch(AuthActions.loadAuthUser.request());
      const accessToken = await getAccessTokenSilently();
      dispatch(AuthActions.loadAuthUser.success({ ...user, accessToken }));
      dispatch(AuthActions.loadCurrentUser.request());
    }

    function syncCypressUserWithState() {
      const cypressUser = localStorage.getItem('auth0-cypress');
      if (!cypressUser) {
        return;
      }

      const storedUser = JSON.parse(cypressUser);
      dispatch(
        AuthActions.loadAuthUser.success({
          ...storedUser.body.decodedToken.user,
          accessToken: storedUser.body.access_token,
        })
      );
      dispatch(AuthActions.loadCurrentUser.request());
    }

    if (isCypressTest) {
      syncCypressUserWithState();
    } else {
      syncUserWithState().catch((err) => console.error(err));
    }
  }, [user, dispatch, getAccessTokenSilently]);

  const onLogout = useCallback(() => {
    logout();
    dispatch(AuthActions.logout());
  }, [logout, dispatch]);

  if (!applicationUser || roles.length === 0) {
    return (
      <LoadingIndicator show center>
        <Typography variant={'h4'}>Preparing Your Application...</Typography>
      </LoadingIndicator>
    );
  }

  return <ShellView roles={roles} onLogout={onLogout} />;
};
