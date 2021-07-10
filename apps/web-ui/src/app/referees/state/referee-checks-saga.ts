import { takeEvery } from 'redux-saga/effects';
import { RefereesActions } from './referees-actions';
import { restApiEffect } from '../../state/rest-api-effect';
import { List, RefereeCheckModel } from '@soccer-utilities/core';

function* loadRefereeChecks({payload}: ReturnType<typeof RefereesActions.loadChecks.request>) {
  const queryParams = new URLSearchParams();
  if (payload) {
    queryParams.set('start', payload.start);
    queryParams.set('end', payload.end);
  }
  yield restApiEffect<List<RefereeCheckModel>>(
    restApi => restApi.get(`/referees/checks?${queryParams.toString()}`),
    RefereesActions.loadChecks.success,
    RefereesActions.loadChecks.failed
  );
}

export function* refereeChecksSaga() {
  yield takeEvery(RefereesActions.loadChecks.request, loadRefereeChecks);
}
