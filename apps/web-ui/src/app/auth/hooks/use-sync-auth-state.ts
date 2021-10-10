import { useRootDispatch } from '../../state/root-hooks';
import { useEffect } from 'react';
import { AuthActions } from '../state/auth-actions';
import { useAuth0 } from '@auth0/auth0-react';
import { Dispatch } from 'redux';

function syncCypressUserWithState(dispatch: Dispatch) {
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
}

export function useSyncAuthState(isCypress: boolean) {
  const dispatch = useRootDispatch();
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function syncUserWithState() {
      dispatch(AuthActions.loadAuthUser.request());
      const accessToken = await getAccessTokenSilently();
      dispatch(AuthActions.loadAuthUser.success({ ...user, accessToken }));
    }

    if (isCypress) {
      syncCypressUserWithState(dispatch);
    } else {
      syncUserWithState().catch((err) => console.error(err));
    }
  }, [user, dispatch, getAccessTokenSilently, isCypress]);
}
