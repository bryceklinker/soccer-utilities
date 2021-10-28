import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { UiUserTimesheetModel } from '@soccer-utilities/models';
import { TimesheetsState } from './timesheets-state';
import { TimesheetsActions } from './timesheets-actions';

export const timesheetAdapter = createEntityAdapter<UiUserTimesheetModel>();

export const timesheetsReducer = createReducer<TimesheetsState>(
  { ...timesheetAdapter.getInitialState(), current: null },
  (builder) =>
    builder
      .addCase(TimesheetsActions.loadAll.success, (state, { payload }) =>
        timesheetAdapter.upsertMany(state, payload)
      )
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
      .addCase(TimesheetsActions.delete.request, (state, { payload }) =>
        timesheetAdapter.upsertOne(state, { ...payload, isDeleting: true })
      )
      .addCase(TimesheetsActions.delete.failed, (state, { payload }) =>
        timesheetAdapter.upsertOne(state, { ...payload, isDeleting: false })
      )
      .addCase(TimesheetsActions.delete.success, (state, { payload }) => {
        if (payload.id) {
          return timesheetAdapter.removeOne(state, payload.id);
        }
        return state;
      })
);
