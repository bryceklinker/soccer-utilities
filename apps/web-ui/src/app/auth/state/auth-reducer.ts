import { createReducer } from '@reduxjs/toolkit';
import { AuthActions } from './auth-actions';
import { AuthState } from './auth-state';

export const authInitialState: AuthState = {
  authUser: null,
  currentUser: null,
};

export const authReducer = createReducer(authInitialState, (builder) =>
  builder
    .addCase(AuthActions.loadAuthUser.success, (state, { payload }) => ({
      ...state,
      authUser: payload,
    }))
    .addCase(AuthActions.loadCurrentUser.success, (state, { payload }) => ({
      ...state,
      currentUser: payload,
    }))
    .addCase(AuthActions.logout, (state) => ({
      ...state,
      authUser: null,
      currentUser: null,
    }))
);
