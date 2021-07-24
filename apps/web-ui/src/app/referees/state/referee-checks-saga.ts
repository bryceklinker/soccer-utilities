import { call, put, takeEvery } from 'redux-saga/effects';
import { v4 as uuid } from 'uuid';
import { RefereesActions } from './referees-actions';
import { restApiEffect } from '../../state/rest-api-effect';
import {
  ClientRefereeCheckModel,
  List,
  ListResult,
  RefereeCheckModel,
  NotificationType,
} from '@soccer-utilities/models';
import { refereeCheckMemo } from '@soccer-utilities/schedules-ui';
import { NotificationsActions } from '../../notifications/state/notifications-actions';

function assignClientFieldsToChecks(
  list: ListResult<RefereeCheckModel>
): ListResult<ClientRefereeCheckModel> {
  return List.fromArray(
    list.items.map((check) => ({ ...check, hasBeenWritten: false, id: uuid() }))
  );
}

function* loadRefereeChecks({
  payload,
}: ReturnType<typeof RefereesActions.loadChecks.request>) {
  const queryParams = new URLSearchParams();
  if (payload) {
    queryParams.set('start', payload.start);
    queryParams.set('end', payload.end);
  }
  yield restApiEffect<ListResult<RefereeCheckModel>>(
    (restApi) => restApi.get(`/referees/checks?${queryParams.toString()}`),
    (list: ListResult<RefereeCheckModel>) =>
      RefereesActions.loadChecks.success(assignClientFieldsToChecks(list)),
    RefereesActions.loadChecks.failed
  );
}

function* checkWritten({
  payload,
}: ReturnType<typeof RefereesActions.checkWritten>) {
  const memo = refereeCheckMemo(payload);
  yield call((text) => navigator.clipboard.writeText(text), memo);
  yield put(
    NotificationsActions.publish({
      id: uuid(),
      message: `Copied "${memo}"`,
      type: NotificationType.Success,
    })
  );
}

export function* refereeChecksSaga() {
  yield takeEvery(RefereesActions.loadChecks.request, loadRefereeChecks);
  yield takeEvery(RefereesActions.checkWritten, checkWritten);
}
