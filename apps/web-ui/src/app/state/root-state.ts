import { AuthState } from '../auth';
import { LoadingState } from '../loading';
import { SettingsState } from '../settings';

export type RootState = {
  auth: AuthState,
  loading: LoadingState,
  settings: SettingsState
}
