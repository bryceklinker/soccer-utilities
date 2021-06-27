import { call, put, select, takeEvery } from 'redux-saga/effects';
import { createRestApi, GameScheduleModel } from '@soccer-utilities/core';
import { CurrentScheduleActions } from './current-schedule-actions';
import { selectSettingsApiUrl } from '../../settings/state/settings-selectors';
import { selectUserAccessToken } from '../../auth/state/auth-selectors';

function* loadCurrentSchedule() {
  const apiUrl: string | undefined = yield select(selectSettingsApiUrl);
  const auth: string | undefined = yield select(selectUserAccessToken);

  if (apiUrl) {
    try {
      const restApi = createRestApi(apiUrl, auth);
      const schedule: GameScheduleModel = yield call(restApi.get, `/schedules/current`);
      yield put(CurrentScheduleActions.load.success(schedule));
    } catch {
      yield put(CurrentScheduleActions.load.failed());
    }
  }
}

function* uploadCurrentSchedule(action: ReturnType<typeof CurrentScheduleActions.upload.request>) {
  const apiUrl: string | undefined = yield select(selectSettingsApiUrl);
  const auth: string | undefined = yield select(selectUserAccessToken);
  if (apiUrl) {
    const restApi = createRestApi(apiUrl, auth);
    try {
      yield call(restApi.postForm, `/schedules/current`, action.payload);
      yield put(CurrentScheduleActions.upload.success());
    } catch {
      yield put(CurrentScheduleActions.upload.failed());
    }

  }
}

export function* currentScheduleSaga() {
  yield takeEvery(CurrentScheduleActions.load.request, loadCurrentSchedule);
  yield takeEvery(CurrentScheduleActions.upload.request, uploadCurrentSchedule);
}
