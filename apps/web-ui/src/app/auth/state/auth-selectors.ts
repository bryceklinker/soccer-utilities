import { RootState } from '../../state';
import { AuthState } from './auth-state';
import { createSelector } from '@reduxjs/toolkit';
import { selectIsLoading } from '../../loading';
import { AuthActions } from './auth-actions';

function selectAuthState(state: RootState): AuthState {
  return state.auth;
}

export const selectApplicationUser = createSelector(
  selectAuthState,
  s => s.user
);

export const selectIsApplicationUserLoading = selectIsLoading(AuthActions.loadUser.request);
