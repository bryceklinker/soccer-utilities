import { generateStateFromActions, WebUiModelFactory } from '../../../testing';
import { RefereesActions } from './referees-actions';
import { refereeChecksReducer } from './referee-checks-reducer';
import { RefereeChecksState } from './referee-checks-state';
import { ClientRefereeCheckModel } from '@soccer-utilities/schedules-ui';

describe('refereeChecksReducer', () => {
  test('when initialized then has been loaded is false', () => {
    const state = generateStateFromActions(refereeChecksReducer);

    expect(state.hasBeenLoaded).toEqual(false);
  });

  test('when referee checks are loaded successfully then state has referee checks', () => {
    const checks = WebUiModelFactory.createMany(WebUiModelFactory.createRefereeCheck, 5);

    const state = generateStateFromActions(refereeChecksReducer,
      RefereesActions.loadChecks.success({ items: checks })
    );

    expect(state.ids).toHaveLength(5);
  });

  test('when referee checks are loaded successfully multiple times then state is only has latest checks', () => {
    const checks = WebUiModelFactory.createMany(WebUiModelFactory.createRefereeCheck, 5);
    const state = generateStateFromActions(refereeChecksReducer,
      RefereesActions.loadChecks.success({ items: WebUiModelFactory.createMany(WebUiModelFactory.createRefereeCheck, 3) }),
      RefereesActions.loadChecks.success({ items: checks })
    );

    expect(state.ids).toHaveLength(5);
  });

  test('when referee checks loaded successfully then has been loaded is true', () => {
    const checks = WebUiModelFactory.createMany(WebUiModelFactory.createRefereeCheck, 5);

    const state = generateStateFromActions(refereeChecksReducer,
      RefereesActions.loadChecks.success({ items: checks })
    );

    expect(state.hasBeenLoaded).toEqual(true);
  });

  test('when referee checks load failed then has been loaded is true', () => {
    const state = generateStateFromActions(refereeChecksReducer,
      RefereesActions.loadChecks.failed()
    );

    expect(state.hasBeenLoaded).toEqual(true);
  })

  test('when referee checks are loaded successfully then assigns client properties to checks', () => {
    const check = WebUiModelFactory.createRefereeCheck();

    const state = generateStateFromActions(refereeChecksReducer,
      RefereesActions.loadChecks.success({ items: [check] })
    );

    const clientCheck = getCheckByIdIndexFromState(state, 0);
    expect(clientCheck?.id).not.toEqual(null);
    expect(clientCheck?.id).not.toEqual(undefined);
    expect(clientCheck?.hasBeenWritten).toEqual(false);
  });

  test('when check is written then check has been written is true', () => {
    const check = WebUiModelFactory.createRefereeCheck();
    const stateWithChecks = generateStateFromActions(refereeChecksReducer, RefereesActions.loadChecks.success({ items: [check] }));

    const state = refereeChecksReducer(stateWithChecks, RefereesActions.checkWritten(getCheckByIdIndexFromState(stateWithChecks, 0) as ClientRefereeCheckModel));

    const clientCheck = getCheckByIdIndexFromState(state, 0);
    expect(clientCheck?.hasBeenWritten).toEqual(true);
  });

  function getCheckByIdIndexFromState(state: RefereeChecksState, index: number): ClientRefereeCheckModel | undefined {
    return state.entities[state.ids[index]];
  }
});
