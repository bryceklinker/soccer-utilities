import { generateStateFromActions, WebUiModelFactory } from '../../../testing';
import { TimesheetsActions } from './timesheets-actions';
import { timesheetsReducer } from './timesheets-reducer';
import { List, TimesheetStatus } from '@soccer-utilities/models';

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

  test('when all timesheets are loaded successfully then timesheets are added to state', () => {
    const result = WebUiModelFactory.createListResult(
      WebUiModelFactory.createUserTimesheetModel,
      5
    );

    const state = generateStateFromActions(
      timesheetsReducer,
      TimesheetsActions.loadAll.success(result)
    );

    expect(state.ids).toHaveLength(5);
  });

  test('when delete timesheet is requested then timesheet is marked as deleting', () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel();

    const state = generateStateFromActions(
      timesheetsReducer,
      TimesheetsActions.loadAll.success(List.fromItems(timesheet)),
      TimesheetsActions.delete.request(timesheet)
    );

    expect(state.entities[timesheet.id || '']?.isDeleting).toEqual(true);
  });

  test('when delete timesheet completes successfully then timesheet is removed from state', () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel();

    const state = generateStateFromActions(
      timesheetsReducer,
      TimesheetsActions.loadAll.success(List.fromItems(timesheet)),
      TimesheetsActions.delete.request(timesheet),
      TimesheetsActions.delete.success(timesheet)
    );

    expect(state.ids).not.toContainEqual(timesheet.id);
  });

  test('when delete timesheet fails then timesheet is not deleting', () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel();

    const state = generateStateFromActions(
      timesheetsReducer,
      TimesheetsActions.loadAll.success(List.fromItems(timesheet)),
      TimesheetsActions.delete.request(timesheet),
      TimesheetsActions.delete.failed(timesheet)
    );

    expect(state.entities[timesheet.id || '']?.isDeleting).toEqual(false);
  });
});
