import {all} from 'redux-saga/effects';
import { currentScheduleSaga } from '../current-schedule';

export function* rootSaga() {
  yield all([
    currentScheduleSaga()
  ]);
}
