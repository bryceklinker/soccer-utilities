import { createAsyncActionSet, emptyPrepare } from '../../state';
import { ApplicationUser } from './auth-models';

export const AuthActions = {
  loadUser: createAsyncActionSet('[Auth] Load User',
    emptyPrepare,
    (user: ApplicationUser | null) => ({payload: user}),
    emptyPrepare
  )
}
