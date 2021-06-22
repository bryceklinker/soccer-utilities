import { ApplicationUser } from './auth-models';

export interface AuthState {
  user: ApplicationUser | null;
}
