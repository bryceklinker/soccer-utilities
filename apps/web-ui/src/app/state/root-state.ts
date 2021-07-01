import { AuthState } from '../auth/state/auth-state';
import { LoadingState } from '../loading/state/loading-state';
import { ErrorsState } from '../errors/state/errors-state';
import { SettingsState } from '../settings/state/settings-state';
import { CurrentScheduleState } from '../current-schedule/state/current-schedule-state';

export type RootState = {
  auth: AuthState,
  loading: LoadingState,
  errors: ErrorsState,
  settings: SettingsState,
  currentSchedule: CurrentScheduleState;
}