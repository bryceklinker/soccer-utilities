import { generateStateFromActions, WebUiModelFactory } from '../../../testing';
import { errorsReducer } from './errors-reducer';
import { CurrentScheduleActions } from '../../current-schedule/state/current-schedule-actions';
import { getAsyncActionSetBaseType } from '../../state/create-async-action-set';

describe('errorsReducer', () => {
  test('when failed action received then adds payload to errors', () => {
    const state = generateStateFromActions(errorsReducer,
      CurrentScheduleActions.load.failed()
    );

    expect(state[getAsyncActionSetBaseType(CurrentScheduleActions.load.failed)]).toHaveLength(1);
  });

  test('when success action received then clears errors', () => {
    const state = generateStateFromActions(errorsReducer,
      CurrentScheduleActions.load.failed(),
      CurrentScheduleActions.load.success(WebUiModelFactory.createGameSchedule())
    );

    expect(state[getAsyncActionSetBaseType(CurrentScheduleActions.load.failed)]).toHaveLength(0);
  });
});
