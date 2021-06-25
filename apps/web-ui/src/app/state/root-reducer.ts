import { combineReducers } from 'redux';
import { RootState } from './root-state';
import { authReducer } from '../auth';
import { loadingReducer } from '../loading';
import { settingsReducer } from '../settings';
import { currentScheduleReducer } from '../current-schedule';

export const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  loading: loadingReducer,
  settings: settingsReducer,
  currentSchedule: currentScheduleReducer,
});
