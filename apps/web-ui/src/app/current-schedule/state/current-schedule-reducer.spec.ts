import { generateStateFromActions, WebUiModelFactory } from '../../../testing';
import { CurrentScheduleActions } from './current-schedule-actions';
import { currentScheduleReducer } from './current-schedule-reducer';

describe('currentScheduleReducer', () => {
  test('when schedule loaded successfully then state has game schedule', () => {
    const schedule = WebUiModelFactory.createGameSchedule();

    const state = generateStateFromActions(currentScheduleReducer,
      CurrentScheduleActions.load.success(schedule)
    );

    expect(state.games).toHaveLength(schedule.games.length);
    expect(state.lastUpdated).toEqual(schedule.lastUpdated);
  });
});
