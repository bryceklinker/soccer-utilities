import { setupSagaTest } from '../../../testing/setup-saga-test';
import { WebUiModelFactory, TestingRestApiServer } from '../../../testing';
import { RefereesActions } from './referees-actions';
import { waitFor } from '@testing-library/dom';
import { HttpStatusCodes } from '@soccer-utilities/core';
import { RestRequest } from 'msw';

describe('refereeChecksSaga', () => {
  test('when load referee checks requested then gets referee checks from api', async () => {
    const { store, apiUrl } = setupSagaTest();
    const checks = WebUiModelFactory.createMany(WebUiModelFactory.createRefereeCheck, 4);
    TestingRestApiServer.setupGet(`${apiUrl}/referees/checks`, { items: checks });

    store.dispatch(RefereesActions.loadChecks.request());

    await waitFor(() => expect(store.getActions()).toContainEqual(RefereesActions.loadChecks.success({ items: checks })));
  });

  test('when load referee checks requested with date range then gets referee checks for date range', async () => {
    const { store, apiUrl } = setupSagaTest();
    const checks = WebUiModelFactory.createMany(WebUiModelFactory.createRefereeCheck, 4);
    let request: RestRequest | undefined;
    TestingRestApiServer.setupGet(`${apiUrl}/referees/checks`, { items: checks }, {
      captureRequest: req => request = req
    });

    store.dispatch(RefereesActions.loadChecks.request({start: '2012-03-26', end: '2015-04-30'}));

    await waitFor(() => expect(store.getActions()).toContainEqual(RefereesActions.loadChecks.success({items: checks})));
    expect(request?.url.searchParams.get('start')).toEqual('2012-03-26');
    expect(request?.url.searchParams.get('end')).toEqual('2015-04-30');
  })

  test('when load referee checks requested and fails then notifies of failure', async () => {
    const { store, apiUrl } = setupSagaTest();
    TestingRestApiServer.setupGet(`${apiUrl}/referees/checks`, undefined, {status: HttpStatusCodes.NotFound});

    store.dispatch(RefereesActions.loadChecks.request());

    await waitFor(() => expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: RefereesActions.loadChecks.failed.type
    })))
  })
});
