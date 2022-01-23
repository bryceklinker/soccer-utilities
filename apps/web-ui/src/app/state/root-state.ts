import { AuthState } from '../auth/state/auth-state';
import { LoadingState } from '../loading/state/loading-state';
import { ErrorsState } from '../errors/state/errors-state';
import { SettingsState } from '../settings/state/settings-state';
import { CurrentScheduleState } from '../current-schedule/state/current-schedule-state';
import { RefereeChecksState } from '../referees/state/referee-checks-state';
import { NotificationsState } from '../notifications/state/notifications-state';
import { TimesheetsState } from '../timesheets/state/timesheets-state';
import { RefereeReimbursementChecksState } from '../referees/state/referee-reimbursement-checks-state';

export type RootState = {
  auth: AuthState;
  loading: LoadingState;
  errors: ErrorsState;
  settings: SettingsState;
  currentSchedule: CurrentScheduleState;
  refereeChecks: RefereeChecksState;
  refereeReimbursementChecks: RefereeReimbursementChecksState;
  notifications: NotificationsState;
  timesheets: TimesheetsState;
};
