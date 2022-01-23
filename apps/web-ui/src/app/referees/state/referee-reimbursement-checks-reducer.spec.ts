import { generateStateFromActions, WebUiModelFactory } from '../../../testing';
import { refereeReimbursementChecksReducer } from './referee-reimbursement-checks-reducer';
import { RefereesActions } from './referees-actions';

describe('refereeReimbursementChecksReducer', () => {
  test('when checks are loaded successfully then checks are added to state', () => {
    const checks = WebUiModelFactory.createListResult(
      WebUiModelFactory.createRefereeReimbursementCheck,
      2
    );

    const state = generateStateFromActions(
      refereeReimbursementChecksReducer,
      RefereesActions.loadReimbursementChecks.success(checks)
    );

    expect(state.ids).toHaveLength(2);
  });

  test('when checks are loaded successfully then state is loaded', () => {
    const checks = WebUiModelFactory.createListResult(
      WebUiModelFactory.createRefereeReimbursementCheck,
      1
    );

    const state = generateStateFromActions(
      refereeReimbursementChecksReducer,
      RefereesActions.loadReimbursementChecks.success(checks)
    );

    expect(state.hasBeenLoaded).toEqual(true);
  });
});
