import { takeEvery } from 'redux-saga/effects';
import { TimesheetsActions } from './timesheets-actions';
import { restApiEffect } from '../../state/rest-api-effect';
import { UserTimesheetModel } from '@soccer-utilities/models';

function* loadCurrentTimesheet() {
  yield restApiEffect(
    (restApi) => restApi.get<UserTimesheetModel>('/timesheets/current'),
    TimesheetsActions.loadCurrent.success,
    TimesheetsActions.loadCurrent.failed
  );
}

function* clockIn() {
  yield restApiEffect(
    (restApi) =>
      restApi.post<UserTimesheetModel>('/timesheets/current/clock-in'),
    TimesheetsActions.clockIn.success,
    TimesheetsActions.clockIn.failed
  );
}

function* clockOut() {
  yield restApiEffect(
    (restApi) =>
      restApi.post<UserTimesheetModel>('/timesheets/current/clock-out'),
    TimesheetsActions.clockOut.success,
    TimesheetsActions.clockOut.failed
  );
}

function* pay({ payload }: ReturnType<typeof TimesheetsActions.pay.request>) {
  yield restApiEffect(
    (restApi) =>
      restApi.post<UserTimesheetModel>(`/timesheets/${payload.id}/pay`),
    TimesheetsActions.pay.success,
    TimesheetsActions.pay.failed
  );
}

export function* timesheetsSaga() {
  yield takeEvery(TimesheetsActions.loadCurrent.request, loadCurrentTimesheet);
  yield takeEvery(TimesheetsActions.clockIn.request, clockIn);
  yield takeEvery(TimesheetsActions.clockOut.request, clockOut);
  yield takeEvery(TimesheetsActions.pay.request, pay);
}
