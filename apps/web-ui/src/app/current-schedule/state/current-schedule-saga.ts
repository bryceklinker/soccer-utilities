import { takeEvery } from 'redux-saga/effects';
import { GameScheduleModel } from '@soccer-utilities/models';
import { CurrentScheduleActions } from './current-schedule-actions';
import { restApiEffect } from '../../state/rest-api-effect';

function* loadCurrentSchedule() {
  yield restApiEffect<GameScheduleModel>(
    (restApi) => restApi.get('/schedules/current'),
    CurrentScheduleActions.load.success,
    CurrentScheduleActions.load.failed
  );
}

function* uploadCurrentSchedule(
  action: ReturnType<typeof CurrentScheduleActions.upload.request>
) {
  yield restApiEffect<void>(
    (restApi) => restApi.post('/schedules/current', action.payload),
    () => [
      CurrentScheduleActions.upload.success(),
      CurrentScheduleActions.load.request(),
    ],
    CurrentScheduleActions.upload.failed
  );
}

export function* currentScheduleSaga() {
  yield takeEvery(CurrentScheduleActions.load.request, loadCurrentSchedule);
  yield takeEvery(CurrentScheduleActions.upload.request, uploadCurrentSchedule);
}
