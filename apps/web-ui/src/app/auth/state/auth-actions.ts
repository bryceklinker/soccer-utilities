import {
  createAsyncActionSet,
  emptyPrepare,
} from '../../state/create-async-action-set';
import { AuthUser } from './auth-models';
import { UserModel } from '@soccer-utilities/models';

export const AuthActions = {
  loadUser: createAsyncActionSet(
    '[Auth] Load Auth User',
    emptyPrepare,
    (user: AuthUser | null) => ({ payload: user }),
    emptyPrepare
  ),
  loadRoles: createAsyncActionSet(
    '[Auth] Load Current User',
    emptyPrepare,
    (user: UserModel) => ({ payload: user }),
    emptyPrepare
  ),
};
