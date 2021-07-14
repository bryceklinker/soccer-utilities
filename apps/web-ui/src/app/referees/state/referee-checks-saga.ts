import { call, takeEvery } from 'redux-saga/effects';
import {v4 as uuid} from 'uuid';
import { RefereesActions } from './referees-actions';
import { restApiEffect } from '../../state/rest-api-effect';
import { List, ListResult, RefereeCheckModel } from '@soccer-utilities/core';
import { ClientRefereeCheckModel } from '@soccer-utilities/schedules-ui';
import { refereeCheckMemo } from '../../../../../../libs/schedules-ui/src/lib/referees/referee-check-memo';

function assignClientFieldsToChecks(list: ListResult<RefereeCheckModel>): ListResult<ClientRefereeCheckModel> {
  return List.fromArray(list.items.map(check => ({...check, hasBeenWritten: false, id: uuid()})));
}

function* loadRefereeChecks({payload}: ReturnType<typeof RefereesActions.loadChecks.request>) {
  const queryParams = new URLSearchParams();
  if (payload) {
    queryParams.set('start', payload.start);
    queryParams.set('end', payload.end);
  }
  yield restApiEffect<ListResult<RefereeCheckModel>>(
    restApi => restApi.get(`/referees/checks?${queryParams.toString()}`),
    (list: ListResult<RefereeCheckModel>) => RefereesActions.loadChecks.success(assignClientFieldsToChecks(list)),
    RefereesActions.loadChecks.failed
  );
}

function* checkWritten({payload}: ReturnType<typeof RefereesActions.checkWritten>) {
  const memo = refereeCheckMemo(payload);
  yield call(navigator.clipboard.writeText, memo);
}

export function* refereeChecksSaga() {
  yield takeEvery(RefereesActions.loadChecks.request, loadRefereeChecks);
  yield takeEvery(RefereesActions.checkWritten, checkWritten);
}
