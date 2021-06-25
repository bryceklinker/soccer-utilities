import { AuthState } from '../auth';
import { LoadingState } from '../loading';
import { SettingsState } from '../settings';
import { CurrentScheduleState } from '../current-schedule/state';

export type RootState = {
  auth: AuthState,
  loading: LoadingState,
  settings: SettingsState,
  currentSchedule: CurrentScheduleState;
}
