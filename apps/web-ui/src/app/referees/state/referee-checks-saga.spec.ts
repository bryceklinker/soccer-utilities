import { setupSagaTest } from '../../../testing/setup-saga-test';
import { WebUiModelFactory, TestingRestApiServer } from '../../../testing';
import { RefereesActions } from './referees-actions';
import { waitFor } from '@testing-library/dom';
import { List, NotificationType } from '@soccer-utilities/models';
import { HttpStatusCodes } from '@soccer-utilities/testing-support';
import { RestRequest } from 'msw';
import { refereeCheckMemo } from '@soccer-utilities/schedules-ui';
import { NotificationsActions } from '../../notifications/state/notifications-actions';

describe('refereeChecksSaga', () => {
  describe('load', () => {
    test('when load referee checks requested then gets referee checks from api', async () => {
      const { store, apiUrl } = setupSagaTest();
      const checks = WebUiModelFactory.createListResult(
        WebUiModelFactory.createRefereeCheck,
        4
      );
      TestingRestApiServer.setupGet(`${apiUrl}/referees/checks`, checks);

      store.dispatch(RefereesActions.loadChecks.request());

      await waitFor(() =>
        expect(store.getActions()).toContainEqual(
          expect.objectContaining({
            type: RefereesActions.loadChecks.success.type,
          })
        )
      );
    });

    test('when load referee checks succeeds then assigns client fields to checks', async () => {
      const { store, apiUrl } = setupSagaTest();
      const check = WebUiModelFactory.createRefereeCheck();
      TestingRestApiServer.setupGet(
        `${apiUrl}/referees/checks`,
        List.fromItems(check)
      );

      store.dispatch(RefereesActions.loadChecks.request());

      await waitFor(() => {
        const successAction = store
          .getActions()
          .find(
            (a) => a.type === RefereesActions.loadChecks.success.type
          ) as ReturnType<typeof RefereesActions.loadChecks.success>;
        expect(successAction.payload.items).toHaveLength(1);
        expect(successAction.payload.items[0].id).toBeTruthy();
        expect(successAction.payload.items[0].hasBeenWritten).toEqual(false);
      });
    });

    test('when load referee checks requested with date range then gets referee checks for date range', async () => {
      const { store, apiUrl } = setupSagaTest();
      const checks = WebUiModelFactory.createListResult(
        WebUiModelFactory.createRefereeCheck,
        4
      );
      let request: RestRequest | undefined;
      TestingRestApiServer.setupGet(`${apiUrl}/referees/checks`, checks, {
        captureRequest: (req) => (request = req),
      });

      store.dispatch(
        RefereesActions.loadChecks.request({
          start: '2012-03-26',
          end: '2015-04-30',
        })
      );

      await waitFor(() =>
        expect(store.getActions()).toContainEqual(
          expect.objectContaining({
            type: RefereesActions.loadChecks.success.type,
          })
        )
      );
      expect(request?.url.searchParams.get('start')).toEqual('2012-03-26');
      expect(request?.url.searchParams.get('end')).toEqual('2015-04-30');
    });

    test('when load referee checks requested and fails then notifies of failure', async () => {
      const { store, apiUrl } = setupSagaTest();
      TestingRestApiServer.setupGet(`${apiUrl}/referees/checks`, undefined, {
        status: HttpStatusCodes.NotFound,
      });

      store.dispatch(RefereesActions.loadChecks.request());

      await waitFor(() =>
        expect(store.getActions()).toContainEqual(
          expect.objectContaining({
            type: RefereesActions.loadChecks.failed.type,
          })
        )
      );
    });
  });

  describe('checkWritten', () => {
    test('when check written then copies memo to clipboard', async () => {
      const { store } = setupSagaTest();
      const check = WebUiModelFactory.createClientRefereeCheckModel();

      store.dispatch(RefereesActions.checkWritten(check));

      const memo = refereeCheckMemo(check);
      await waitFor(() =>
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(memo)
      );
    });

    test('when check written then publishes notification', async () => {
      const { store } = setupSagaTest();
      const check = WebUiModelFactory.createClientRefereeCheckModel();

      store.dispatch(RefereesActions.checkWritten(check));

      const memo = refereeCheckMemo(check);
      await waitFor(() =>
        expect(store.getActions()).toContainEqual(
          expect.objectContaining({
            type: NotificationsActions.publish.type,
            payload: expect.objectContaining({
              type: NotificationType.Success,
              message: `Copied "${memo}"`,
            }),
          })
        )
      );
    });
  });
});
