import { generateStateFromActions, WebUiModelFactory } from '../../../testing';
import { TimesheetsActions } from './timesheets-actions';
import { timesheetsReducer } from './timesheets-reducer';
import { TimesheetStatus } from '@soccer-utilities/models';

describe('timesheetsReducer', () => {
  test('when current timesheet loaded successfully then state has current timesheet', () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel({
      id: undefined,
      status: TimesheetStatus.New,
    });
    const state = generateStateFromActions(
      timesheetsReducer,
      TimesheetsActions.loadCurrent.success(timesheet)
    );

    expect(state.current).toEqual(timesheet);
  });

  test('when timesheet clocked in successfully then updates timesheet in state', () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel({
      status: TimesheetStatus.Open,
    });
    const state = generateStateFromActions(
      timesheetsReducer,
      TimesheetsActions.clockIn.success(timesheet)
    );

    expect(state.current).toEqual(timesheet.id);
    expect(state.entities[timesheet.id || '']).toEqual(timesheet);
    expect(state.ids).toContainEqual(timesheet.id);
  });

  test('when timesheet clocked out successfully then updates timesheet in state', () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel({
      status: TimesheetStatus.Complete,
    });
    const state = generateStateFromActions(
      timesheetsReducer,
      TimesheetsActions.clockOut.success(timesheet)
    );

    expect(state.current).toEqual(timesheet.id);
    expect(state.entities[timesheet.id || '']).toEqual(timesheet);
    expect(state.ids).toContainEqual(timesheet.id);
  });

  test('when current timesheet is requested then state has no current timesheet', () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel();
    const state = generateStateFromActions(
      timesheetsReducer,
      TimesheetsActions.loadCurrent.success(timesheet),
      TimesheetsActions.loadCurrent.request()
    );

    expect(state.current).toEqual(null);
  });
});
