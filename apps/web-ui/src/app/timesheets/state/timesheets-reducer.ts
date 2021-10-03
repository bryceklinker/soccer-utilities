import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { UserTimesheetModel } from '@soccer-utilities/models';
import { TimesheetsState } from './timesheets-state';
import { TimesheetsActions } from './timesheets-actions';

export const timesheetAdapter = createEntityAdapter<UserTimesheetModel>();

export const timesheetsReducer = createReducer<TimesheetsState>(
  { ...timesheetAdapter.getInitialState(), current: null },
  (builder) =>
    builder
      .addCase(TimesheetsActions.loadCurrent.success, (state, { payload }) => ({
        ...state,
        current: payload,
      }))
      .addCase(TimesheetsActions.loadCurrent.request, (state) => ({
        ...state,
        current: null,
      }))
      .addCase(TimesheetsActions.clockIn.success, (state, { payload }) => {
        return timesheetAdapter.upsertOne(
          { ...state, current: payload.id || null },
          payload
        );
      })
      .addCase(TimesheetsActions.clockOut.success, (state, { payload }) => {
        return timesheetAdapter.upsertOne(
          { ...state, current: payload.id || null },
          payload
        );
      })
);
