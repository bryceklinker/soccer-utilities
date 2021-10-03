import { TestingRestApiServer, WebUiModelFactory } from '../../../testing';
import { setupSagaTest } from '../../../testing/setup-saga-test';
import { TimesheetsActions } from './timesheets-actions';
import { waitFor } from '@testing-library/dom';
import { TimesheetStatus, UserTimesheetModel } from '@soccer-utilities/models';

describe('timesheetsSaga', () => {
  test('when load current timesheet requested then notifies timesheet loaded successfully', async () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel();
    const { store, apiUrl } = setupSagaTest();
    TestingRestApiServer.setupGet(`${apiUrl}/timesheets/current`, timesheet);

    store.dispatch(TimesheetsActions.loadCurrent.request());

    await waitFor(() =>
      expect(store.getActions()).toContainEqual(
        TimesheetsActions.loadCurrent.success(timesheet)
      )
    );
  });

  test('when clock in requested then notifies clock in timesheet success', async () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel();
    const { store, apiUrl } = setupSagaTest();
    TestingRestApiServer.setupPost(
      `${apiUrl}/timesheets/current/clock-in`,
      timesheet
    );

    store.dispatch(TimesheetsActions.clockIn.request());

    await waitFor(() =>
      expect(store.getActions()).toContainEqual(
        TimesheetsActions.clockIn.success(timesheet)
      )
    );
  });

  test('when clock out requested then notifies clock out timesheet success', async () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel();
    const { store, apiUrl } = setupSagaTest();
    TestingRestApiServer.setupPost(
      `${apiUrl}/timesheets/current/clock-out`,
      timesheet
    );

    store.dispatch(TimesheetsActions.clockOut.request());

    await waitFor(() =>
      expect(store.getActions()).toContainEqual(
        TimesheetsActions.clockOut.success(timesheet)
      )
    );
  });

  test('when clock out requested then notifies clock out timesheet success', async () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel();
    const expected: UserTimesheetModel = {
      ...timesheet,
      status: TimesheetStatus.Paid,
    };
    const { store, apiUrl } = setupSagaTest();
    TestingRestApiServer.setupPost(
      `${apiUrl}/timesheets/${timesheet.id}/pay`,
      expected
    );

    store.dispatch(TimesheetsActions.pay.request(timesheet));

    await waitFor(() =>
      expect(store.getActions()).toContainEqual(
        TimesheetsActions.pay.success(expected)
      )
    );
  });
});
