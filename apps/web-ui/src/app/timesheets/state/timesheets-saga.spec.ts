import { TestingRestApiServer, WebUiModelFactory } from '../../../testing';
import { setupSagaTest } from '../../../testing/setup-saga-test';
import { TimesheetsActions } from './timesheets-actions';
import { waitFor } from '@testing-library/dom';
import { TimesheetStatus, UserTimesheetModel } from '@soccer-utilities/models';
import { HttpStatusCodes } from '@soccer-utilities/testing-support';

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

  test('when load all requested then loads all timesheets', async () => {
    const { store, apiUrl } = setupSagaTest();
    const result = WebUiModelFactory.createListResult(
      WebUiModelFactory.createUserTimesheetModel,
      4
    );
    TestingRestApiServer.setupGet(`${apiUrl}/timesheets`, result);

    store.dispatch(TimesheetsActions.loadAll.request());

    await waitFor(() =>
      expect(store.getActions()).toContainEqual(
        TimesheetsActions.loadAll.success(result)
      )
    );
  });

  test('when delete timesheet requested then deletes timesheet from api', async () => {
    const { store, apiUrl } = setupSagaTest();
    const timesheet = WebUiModelFactory.createUserTimesheetModel();
    TestingRestApiServer.setupDelete(`${apiUrl}/timesheets/${timesheet.id}`);

    store.dispatch(TimesheetsActions.delete.request(timesheet));

    await waitFor(() =>
      expect(store.getActions()).toContainEqual(
        TimesheetsActions.delete.success(timesheet)
      )
    );
  });

  test('when delete timesheet fails then notifies that delete failed', async () => {
    const { store, apiUrl } = setupSagaTest();
    const timesheet = WebUiModelFactory.createUserTimesheetModel();
    TestingRestApiServer.setupDelete(`${apiUrl}/timesheets/${timesheet.id}`, {
      status: HttpStatusCodes.InternalServerError,
    });

    store.dispatch(TimesheetsActions.delete.request(timesheet));

    await waitFor(() =>
      expect(store.getActions()).toContainEqual(
        TimesheetsActions.delete.failed(timesheet)
      )
    );
  });
});
