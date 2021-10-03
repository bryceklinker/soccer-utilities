import { combineReducers } from 'redux';
import { RootState } from './root-state';
import { authReducer } from '../auth/state/auth-reducer';
import { loadingReducer } from '../loading/state/loading-reducer';
import { settingsReducer } from '../settings/state/settings-reducer';
import { currentScheduleReducer } from '../current-schedule/state/current-schedule-reducer';
import { errorsReducer } from '../errors/state/errors-reducer';
import { refereeChecksReducer } from '../referees/state/referee-checks-reducer';
import { notificationsReducer } from '../notifications/state/notifications-reducer';
import { timesheetsReducer } from '../timesheets/state/timesheets-reducer';

export const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  loading: loadingReducer,
  settings: settingsReducer,
  currentSchedule: currentScheduleReducer,
  errors: errorsReducer,
  refereeChecks: refereeChecksReducer,
  notifications: notificationsReducer,
  timesheets: timesheetsReducer,
});
