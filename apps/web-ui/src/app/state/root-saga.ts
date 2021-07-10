import {all} from 'redux-saga/effects';
import { currentScheduleSaga } from '../current-schedule/state/current-schedule-saga';
import { refereeChecksSaga } from '../referees/state/referee-checks-saga';

export function* rootSaga() {
  yield all([
    currentScheduleSaga(),
    refereeChecksSaga()
  ]);
}
