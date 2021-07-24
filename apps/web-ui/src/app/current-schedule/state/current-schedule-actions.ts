import {
  createAsyncActionSet,
  emptyPrepare,
} from '../../state/create-async-action-set';
import { GameScheduleModel } from '@soccer-utilities/models';

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
