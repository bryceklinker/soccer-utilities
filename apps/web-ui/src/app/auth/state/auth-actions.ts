import {
  createAsyncActionSet,
  emptyPrepare,
} from '../../state/create-async-action-set';
import { AuthUser } from './auth-models';
import { UserModel } from '@soccer-utilities/models';
import { createAction } from '@reduxjs/toolkit';

export const AuthActions = {
  loadAuthUser: createAsyncActionSet(
    '[Auth] Load Auth User',
    emptyPrepare,
    (user: AuthUser | null) => ({ payload: user }),
    emptyPrepare
  ),
  loadCurrentUser: createAsyncActionSet(
    '[Auth] Load Current User',
    emptyPrepare,
    (user: UserModel) => ({ payload: user }),
    emptyPrepare
  ),
  logout: createAction('[Auth] Logout'),
};
