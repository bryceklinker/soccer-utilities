import { useRootDispatch } from '../../state/root-hooks';
import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';
import { AuthActions } from '../state/auth-actions';

export function useAuthLogout() {
  const dispatch = useRootDispatch();
  const { logout } = useAuth0();

  return useCallback(() => {
    logout({ returnTo: `${window.location.origin}` });
    dispatch(AuthActions.logout());
  }, [logout, dispatch]);
}
