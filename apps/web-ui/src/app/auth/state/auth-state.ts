import { UserModel } from '@soccer-utilities/models';
import { AuthUser } from './auth-models';

export interface AuthState {
  authUser: AuthUser | null;
  currentUser: UserModel | null;
}
