import { all } from 'redux-saga/effects';
import { authSaga } from '../auth/state/auth-saga';
import { currentScheduleSaga } from '../current-schedule/state/current-schedule-saga';
import { refereeChecksSaga } from '../referees/state/referee-checks-saga';
import { timesheetsSaga } from '../timesheets/state/timesheets-saga';
import { refereeReimbursementChecksSaga } from '../referees/state/referee-reimbursement-checks-saga';

export function* rootSaga() {
  yield all([
    currentScheduleSaga(),
    refereeChecksSaga(),
    refereeReimbursementChecksSaga(),
    authSaga(),
    timesheetsSaga(),
  ]);
}
