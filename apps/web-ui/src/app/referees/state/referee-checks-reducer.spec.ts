import { generateStateFromActions, WebUiModelFactory } from '../../../testing';
import { RefereesActions } from './referees-actions';
import { refereeChecksReducer } from './referee-checks-reducer';
import { List } from '@soccer-utilities/core';

describe('refereeChecksReducer', () => {
  test('when initialized then has been loaded is false', () => {
    const state = generateStateFromActions(refereeChecksReducer);

    expect(state.hasBeenLoaded).toEqual(false);
  });

  test('when referee checks are loaded successfully then state has referee checks', () => {
    const checks = WebUiModelFactory.createListResult(WebUiModelFactory.createClientRefereeCheckModel, 5);

    const state = generateStateFromActions(refereeChecksReducer,
      RefereesActions.loadChecks.success(checks)
    );

    expect(state.ids).toHaveLength(5);
  });

  test('when referee checks are loaded successfully multiple times then state is only has latest checks', () => {
    const checks = WebUiModelFactory.createListResult(WebUiModelFactory.createClientRefereeCheckModel, 5);
    const state = generateStateFromActions(refereeChecksReducer,
      RefereesActions.loadChecks.success(WebUiModelFactory.createListResult(WebUiModelFactory.createClientRefereeCheckModel, 3)),
      RefereesActions.loadChecks.success(checks)
    );

    expect(state.ids).toHaveLength(5);
  });

  test('when referee checks loaded successfully then has been loaded is true', () => {
    const checks = WebUiModelFactory.createListResult(WebUiModelFactory.createClientRefereeCheckModel, 5);

    const state = generateStateFromActions(refereeChecksReducer,
      RefereesActions.loadChecks.success(checks)
    );

    expect(state.hasBeenLoaded).toEqual(true);
  });

  test('when referee checks load failed then has been loaded is true', () => {
    const state = generateStateFromActions(refereeChecksReducer,
      RefereesActions.loadChecks.failed()
    );

    expect(state.hasBeenLoaded).toEqual(true);
  });

  test('when check is written then check has been written is true', () => {
    const check = WebUiModelFactory.createClientRefereeCheckModel();
    const state = generateStateFromActions(refereeChecksReducer,
      RefereesActions.loadChecks.success(List.fromItems(check)),
      RefereesActions.checkWritten(check)
    );

    expect(state.entities[check.id]?.hasBeenWritten).toEqual(true);
  });
});
