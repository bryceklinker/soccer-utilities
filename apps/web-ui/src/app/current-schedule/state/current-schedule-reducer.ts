import { createReducer } from '@reduxjs/toolkit';
import { CurrentScheduleActions } from './current-schedule-actions';
import { CurrentScheduleState } from './current-schedule-state';

export const currentScheduleInitialState: CurrentScheduleState = {
  games: [],
  lastUpdated: null
};

export const currentScheduleReducer = createReducer(currentScheduleInitialState, builder => builder
  .addCase(CurrentScheduleActions.load.success, (state, {payload}) => ({...state, ...payload}))
);
