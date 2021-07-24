import { createReducer } from '@reduxjs/toolkit';
import { AuthActions } from './auth-actions';
import { AuthState } from './auth-state';

export const authInitialState: AuthState = {
  user: null,
};

export const authReducer = createReducer(authInitialState, (builder) =>
  builder.addCase(AuthActions.loadUser.success, (state, { payload }) => ({
    ...state,
    user: payload,
  }))
);
