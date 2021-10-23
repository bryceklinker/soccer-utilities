import { useEffect } from 'react';
import { useRootDispatch, useRootSelector } from '../../state/root-hooks';
import { selectAuthUser, selectCurrentUser } from '../state/auth-selectors';
import { UserModel } from '@soccer-utilities/models';
import { selectIsLoading } from '../../loading/state/loading-selectors';
import { AuthActions } from '../state/auth-actions';

export function useCurrentUser(): UserModel | null {
  const dispatch = useRootDispatch();
  const authUser = useRootSelector(selectAuthUser);
  const currentUser = useRootSelector(selectCurrentUser);
  const isLoadingCurrentUser = useRootSelector(
    selectIsLoading(AuthActions.loadCurrentUser.request)
  );
  const isLoadingAuthUser = useRootSelector(
    selectIsLoading(AuthActions.loadAuthUser.request)
  );

  useEffect(() => {
    if (!authUser || isLoadingCurrentUser || isLoadingAuthUser || currentUser) {
      return;
    }

    dispatch(AuthActions.loadCurrentUser.request());
  }, [
    authUser,
    currentUser,
    isLoadingCurrentUser,
    isLoadingAuthUser,
    dispatch,
  ]);

  return currentUser;
}
