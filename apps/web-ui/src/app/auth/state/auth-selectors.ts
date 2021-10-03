import { createSelector } from '@reduxjs/toolkit';
import { authInitialState } from './auth-reducer';
import { AuthState } from './auth-state';
import { RootState } from '../../state/root-state';
import { Role } from '@soccer-utilities/models';

function selectAuthState(state: RootState): AuthState {
  return state?.auth || authInitialState;
}

export const selectAuthUser = createSelector(
  selectAuthState,
  (s) => s.authUser
);

export const selectCurrentUser = createSelector(
  selectAuthState,
  (s) => s.currentUser
);

export const selectUserRoles = createSelector(
  selectAuthState,
  (s) => s.currentUser?.roles?.map((r) => r.name as Role) || []
);

export const selectUserAccessToken = createSelector(
  selectAuthUser,
  (state) => state?.accessToken
);
