import { FunctionComponent } from 'react';
import { ShellView } from './ShellView';
import { LoadingIndicator } from '@soccer-utilities/common-ui';
import { Typography } from '@material-ui/core';
import { useRootSelector } from '../../state/root-hooks';
import {
  selectAuthUser,
  selectUserRoles,
} from '../../auth/state/auth-selectors';
import { useAuthCallback } from '../../auth/hooks/use-auth-callback';
import { useSyncAuthState } from '../../auth/hooks/use-sync-auth-state';
import { useAuthLogout } from '../../auth/hooks/use-auth-logout';
import { useCurrentUser } from '../../auth/hooks/use-current-user';

declare global {
  interface Window {
    Cypress?: unknown;
  }
}

const isCypressTest = !!window.Cypress;

export const ShellContainer: FunctionComponent = () => {
  const authUser = useRootSelector(selectAuthUser);
  const currentUser = useCurrentUser();
  const roles = useRootSelector(selectUserRoles);

  useAuthCallback(isCypressTest);
  useSyncAuthState(isCypressTest);
  const onLogout = useAuthLogout();

  if (!authUser) {
    return (
      <LoadingIndicator show center>
        <Typography variant={'h4'}>Waiting for user login...</Typography>
      </LoadingIndicator>
    );
  }

  if (!currentUser) {
    return (
      <LoadingIndicator show center>
        <Typography variant={'h4'}>Loading current user...</Typography>
      </LoadingIndicator>
    );
  }

  return <ShellView roles={roles} onLogout={onLogout} />;
};
