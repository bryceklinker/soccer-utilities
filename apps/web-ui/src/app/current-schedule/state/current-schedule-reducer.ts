import { createReducer } from '@reduxjs/toolkit';
import { CurrentScheduleState } from './current-schedule-state';
import { CurrentScheduleActions } from './current-schedule-actions';

const initialState: CurrentScheduleState = {
  games: [],
  lastUpdated: null
};

export const currentScheduleReducer = createReducer(initialState, builder => builder
  .addCase(CurrentScheduleActions.load.success, (state, {payload}) => ({...state, ...payload}))
);
