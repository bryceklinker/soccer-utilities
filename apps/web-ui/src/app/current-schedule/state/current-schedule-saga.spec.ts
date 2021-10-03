import { waitFor } from '@testing-library/dom';
import {
  WebUiModelFactory,
  TestingRestApiServer,
  TestingStore,
} from '../../../testing';
import { CurrentScheduleActions } from './current-schedule-actions';
import { RestRequest } from 'msw';
import { HttpStatusCodes } from '@soccer-utilities/testing-support';
import { AuthUser } from '../../auth/state/auth-models';
import { setupSagaTest } from '../../../testing/setup-saga-test';

describe('Current Schedule Saga', () => {
  describe('Load Current Schedule', () => {
    test('when load current schedule requested and succeeds then notifies load schedule success', async () => {
      const { store, apiUrl } = setupSagaTest();
      const schedule = WebUiModelFactory.createGameSchedule();
      TestingRestApiServer.setupGet(`${apiUrl}/schedules/current`, schedule);

      store.dispatch(CurrentScheduleActions.load.request());

      await waitFor(() =>
        expect(store.getActions()).toContainEqual(
          CurrentScheduleActions.load.success(schedule)
        )
      );
    });

    test('when load current schedule requested and fails then notifies load schedule failed', async () => {
      const { store, apiUrl } = setupSagaTest();
      TestingRestApiServer.setupGet(`${apiUrl}/schedules/current`, undefined, {
        status: HttpStatusCodes.NotFound,
      });

      store.dispatch(CurrentScheduleActions.load.request());

      await waitFor(() =>
        expect(store.getActions()).toContainEqual(
          CurrentScheduleActions.load.failed()
        )
      );
    });

    test('when load current schedule requested then uses user access token', async () => {
      const { store, apiUrl, user } = setupSagaTest();
      let request: RestRequest | null = null;
      TestingRestApiServer.setupGet(
        `${apiUrl}/schedules/current`,
        WebUiModelFactory.createGameSchedule(),
        {
          captureRequest: (req) => (request = req),
        }
      );

      store.dispatch(CurrentScheduleActions.load.request());

      await waitFor(() =>
        expect(request?.headers?.get('Authorization')).toEqual(
          `Bearer ${user.accessToken}`
        )
      );
    });
  });

  describe('Upload Schedule', () => {
    let store: TestingStore;
    let user: AuthUser;
    let apiUrl: string;

    beforeEach(() => {
      const result = setupSagaTest();
      store = result.store;
      apiUrl = result.apiUrl;
      user = result.user;
      TestingRestApiServer.setupGet(
        `${apiUrl}/schedules/current`,
        WebUiModelFactory.createGameSchedule()
      );
    });

    test('when upload schedule requested then dispatches upload success', async () => {
      const form = new FormData();
      TestingRestApiServer.setupPost(`${apiUrl}/schedules/current`);

      store.dispatch(CurrentScheduleActions.upload.request(form));

      await waitFor(() =>
        expect(store.getActions()).toContainEqual(
          CurrentScheduleActions.upload.success()
        )
      );
    });

    test('when upload schedule requested then uploads form to api', async () => {
      const form = new FormData();
      let request: RestRequest | null = null;
      TestingRestApiServer.setupPost(`${apiUrl}/schedules/current`, undefined, {
        captureRequest: (req) => (request = req),
      });

      store.dispatch(CurrentScheduleActions.upload.request(form));

      await waitFor(() => expect(request?.body).toEqual(form));
    });

    test('when upload schedule fails then notifies of upload failure', async () => {
      TestingRestApiServer.setupPost(`${apiUrl}/schedules/current`, undefined, {
        status: HttpStatusCodes.NotFound,
      });

      store.dispatch(CurrentScheduleActions.upload.request(new FormData()));

      await waitFor(() =>
        expect(store.getActions()).toContainEqual(
          CurrentScheduleActions.upload.failed()
        )
      );
    });

    test('when uploading schedule then uses user token', async () => {
      let request: RestRequest | null = null;
      TestingRestApiServer.setupPost(`${apiUrl}/schedules/current`, undefined, {
        captureRequest: (req) => (request = req),
      });

      store.dispatch(CurrentScheduleActions.upload.request(new FormData()));

      await waitFor(() =>
        expect(request?.headers?.get('Authorization')).toEqual(
          `Bearer ${user.accessToken}`
        )
      );
    });

    test('when uploading schedule then notifies requests to load schedule once upload is successful', async () => {
      TestingRestApiServer.setupPost(`${apiUrl}/schedules/current`);

      store.dispatch(CurrentScheduleActions.upload.request(new FormData()));

      await waitFor(() =>
        expect(store.getActions()).toContainEqual(
          CurrentScheduleActions.load.request()
        )
      );
    });
  });
});
