import { takeEvery } from 'redux-saga/effects';
import { TimesheetsActions } from './timesheets-actions';
import { restApiEffect } from '../../state/rest-api-effect';
import { ListResult, UserTimesheetModel } from '@soccer-utilities/models';

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

function* loadAll() {
  yield restApiEffect(
    (restApi) => restApi.get<ListResult<UserTimesheetModel>>(`/timesheets`),
    TimesheetsActions.loadAll.success,
    TimesheetsActions.loadAll.failed
  );
}

function* deleteTimesheet({
  payload,
}: ReturnType<typeof TimesheetsActions.delete.request>) {
  yield restApiEffect(
    (restApi) => restApi.delete(`/timesheets/${payload.id}`),
    () => TimesheetsActions.delete.success(payload),
    () => TimesheetsActions.delete.failed(payload)
  );
}

export function* timesheetsSaga() {
  yield takeEvery(TimesheetsActions.loadCurrent.request, loadCurrentTimesheet);
  yield takeEvery(TimesheetsActions.clockIn.request, clockIn);
  yield takeEvery(TimesheetsActions.clockOut.request, clockOut);
  yield takeEvery(TimesheetsActions.pay.request, pay);
  yield takeEvery(TimesheetsActions.loadAll.request, loadAll);
  yield takeEvery(TimesheetsActions.delete.request, deleteTimesheet);
}
