import { RootState } from '../../state';
import { AuthState } from './auth-state';
import { createSelector } from '@reduxjs/toolkit';

function selectAuthState(state: RootState): AuthState {
  return state.auth;
}

export const selectApplicationUser = createSelector(
  selectAuthState,
  s => s.user
);
