import { setupSagaTest } from '../../../testing/setup-saga-test';
import { TestingRestApiServer, WebUiModelFactory } from '../../../testing';
import { RefereesActions } from './referees-actions';
import { waitFor } from '@testing-library/dom';

describe('refereeReimbursementChecksSaga', () => {
  describe('load', () => {
    test('when load reimbursement checks requested then gets reimbursement checks from api', async () => {
      const { store, apiUrl } = setupSagaTest();
      const checks = WebUiModelFactory.createListResult(
        WebUiModelFactory.createRefereeReimbursementCheck,
        5
      );
      TestingRestApiServer.setupGet(
        `${apiUrl}/referees/reimbursement-checks`,
        checks
      );

      store.dispatch(RefereesActions.loadReimbursementChecks.request());

      await waitFor(() => {
        expect(store.getActions()).toContainEqual(
          expect.objectContaining({
            type: RefereesActions.loadReimbursementChecks.success.type,
          })
        );
      });
    });
  });
});
