import { createReducer } from '@reduxjs/toolkit';
import { AuthActions } from './auth-actions';
import { AuthState } from './auth-state';

export const authInitialState: AuthState = {
  authUser: null,
  currentUser: null,
};

export const authReducer = createReducer(authInitialState, (builder) =>
  builder
    .addCase(AuthActions.loadUser.success, (state, { payload }) => ({
      ...state,
      authUser: payload,
    }))
    .addCase(AuthActions.loadRoles.success, (state, { payload }) => ({
      ...state,
      currentUser: payload,
    }))
);
