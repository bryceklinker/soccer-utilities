import { call, put, select, takeEvery } from 'redux-saga/effects';
import { selectSettingsApiUrl } from '../../settings';
import axios, { AxiosResponse } from 'axios';
import { GameScheduleModel } from '@soccer-utilities/core';
import { CurrentScheduleActions } from './current-schedule-actions';

function* loadCurrentSchedule() {
  const apiUrl: string | undefined = yield select(selectSettingsApiUrl);
  if (apiUrl) {
    const response: AxiosResponse<GameScheduleModel> = yield call(axios.get, `${apiUrl}/schedules/current`);
    yield put(CurrentScheduleActions.load.success(response.data));
  }
}

function* uploadCurrentSchedule(action: ReturnType<typeof CurrentScheduleActions.upload.request>) {
  const apiUrl: string | undefined = yield select(selectSettingsApiUrl);
  if (apiUrl) {
    yield call(axios.post, `${apiUrl}/schedules/current`, action.payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    yield put(CurrentScheduleActions.upload.success());
  }
}

export function* currentScheduleSaga() {
  yield takeEvery(CurrentScheduleActions.load.request, loadCurrentSchedule);
  yield takeEvery(CurrentScheduleActions.upload.request, uploadCurrentSchedule);
}
