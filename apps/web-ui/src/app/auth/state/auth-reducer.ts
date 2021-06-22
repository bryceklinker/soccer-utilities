import {createReducer} from '@reduxjs/toolkit';
import { AuthState } from './auth-state';
import { AuthActions } from './auth-actions';

const initialState: AuthState = {
  user: null
};

export const authReducer = createReducer(
  initialState,
  builder => builder
    .addCase(AuthActions.loadUser.success, (state, {payload}) => ({...state, user: payload}))
);
