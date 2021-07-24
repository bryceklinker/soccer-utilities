import { createSelector } from '@reduxjs/toolkit';
import { AuthActions } from './auth-actions';
import { authInitialState } from './auth-reducer';
import { AuthState } from './auth-state';
import { RootState } from '../../state/root-state';
import { selectIsLoading } from '../../loading/state/loading-selectors';

function selectAuthState(state: RootState): AuthState {
  return state?.auth || authInitialState;
}

export const selectApplicationUser = createSelector(
  selectAuthState,
  (s) => s.user
);

export const selectIsApplicationUserLoading = selectIsLoading(
  AuthActions.loadUser.request
);
export const selectUserAccessToken = createSelector(
  selectApplicationUser,
  (state) => state?.accessToken
);
