import { takeEvery } from 'redux-saga/effects';
import { RefereesActions } from './referees-actions';
import { restApiEffect } from '../../state/rest-api-effect';
import {
  ListResult,
  RefereeReimbursementCheckModel,
} from '@soccer-utilities/models';

function* loadReimbursementChecks() {
  yield restApiEffect<ListResult<RefereeReimbursementCheckModel>>(
    (restApi) => restApi.get('/referees/reimbursement-checks'),
    RefereesActions.loadReimbursementChecks.success,
    RefereesActions.loadReimbursementChecks.failed
  );
}

export function* refereeReimbursementChecksSaga() {
  yield takeEvery(
    RefereesActions.loadReimbursementChecks.request,
    loadReimbursementChecks
  );
}
