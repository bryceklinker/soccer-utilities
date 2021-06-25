import { createAsyncActionSet, emptyPrepare } from '../../state';
import { GameScheduleModel } from '@soccer-utilities/core';

export const CurrentScheduleActions = {
  load: createAsyncActionSet(
    '[CurrentSchedule] Load',
    emptyPrepare,
    (schedule: GameScheduleModel) => ({ payload: schedule }),
    emptyPrepare
  ),

  upload: createAsyncActionSet(
    '[CurrentSchedule] Upload',
    (formData: FormData) => ({ payload: formData }),
    emptyPrepare,
    emptyPrepare
  ),
};
