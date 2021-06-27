import {all} from 'redux-saga/effects';
import { currentScheduleSaga } from '../current-schedule/state/current-schedule-saga';

export function* rootSaga() {
  yield all([
    currentScheduleSaga()
  ]);
}
