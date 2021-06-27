import { waitFor } from '@testing-library/dom';
import { createSagaTestingStore, ModelFactory, TestingRestApiServer, TestingStore } from '../../../testing';
import { CurrentScheduleActions } from './current-schedule-actions';
import { RestRequest } from 'msw';
import { HttpStatusCodes } from '@soccer-utilities/core';
import { SettingsActions } from '../../settings/state/settings-actions';
import { ApplicationUser } from '../../auth/state/auth-models';
import { AuthActions } from '../../auth/state/auth-actions';

describe('Current Schedule Saga', () => {
  let store: TestingStore;
  let user: ApplicationUser;
  let apiUrl: string;

  beforeEach(() => {
    const settings = ModelFactory.createSettings();
    apiUrl = settings.api.url;
    user = ModelFactory.createUser();

    store = createSagaTestingStore(
      SettingsActions.load.success(settings),
      AuthActions.loadUser.success(user)
    );
  });

  describe('Load Current Schedule', () => {
    test('when load current schedule requested and succeeds then notifies load schedule success', async () => {
      const schedule = ModelFactory.createGameSchedule();
      TestingRestApiServer.setupGet(`${apiUrl}/schedules/current`, schedule);

      store.dispatch(CurrentScheduleActions.load.request());

      await waitFor(() => expect(store.getActions()).toContainEqual(CurrentScheduleActions.load.success(schedule)));
    });

    test('when load current schedule requested and fails then notifies load schedule failed', async () => {
      TestingRestApiServer.setupGet(`${apiUrl}/schedules/current`, undefined, { status: HttpStatusCodes.NotFound });

      store.dispatch(CurrentScheduleActions.load.request());

      await waitFor(() => expect(store.getActions()).toContainEqual(CurrentScheduleActions.load.failed()));
    });

    test('when load current schedule requested then uses user access token', async () => {
      let request: RestRequest | null = null;
      TestingRestApiServer.setupGet(`${apiUrl}/schedules/current`, ModelFactory.createGameSchedule(), {
        captureRequest: req => request = req
      });

      store.dispatch(CurrentScheduleActions.load.request());

      await waitFor(() => expect(request?.headers?.get('Authorization')).toEqual(`Bearer ${user.accessToken}`))
    });
  });

  describe('Upload Schedule', () => {
    test('when upload schedule requested then dispatches upload success', async () => {
      const form = new FormData();
      TestingRestApiServer.setupPost(`${apiUrl}/schedules/current`);

      store.dispatch(CurrentScheduleActions.upload.request(form));

      await waitFor(() => expect(store.getActions()).toContainEqual(CurrentScheduleActions.upload.success()));
    });

    test('when upload schedule requested then uploads form to api', async () => {
      const form = new FormData();
      let request: RestRequest | null = null;
      TestingRestApiServer.setupPost(`${apiUrl}/schedules/current`, undefined, {
        captureRequest: req => request = req
      });

      store.dispatch(CurrentScheduleActions.upload.request(form));

      await waitFor(() => expect(request?.body).toEqual(form));
    });

    test('when upload schedule fails then notifies of upload failure', async () => {
      TestingRestApiServer.setupPost(`${apiUrl}/schedules/current`, undefined, { status: HttpStatusCodes.NotFound });

      store.dispatch(CurrentScheduleActions.upload.request(new FormData()));

      await waitFor(() => expect(store.getActions()).toContainEqual(CurrentScheduleActions.upload.failed()));
    });

    test('when uploading schedule then uses user token', async () => {
      let request: RestRequest | null = null;
      TestingRestApiServer.setupPost(`${apiUrl}/schedules/current`, undefined, {
        captureRequest: req => request = req
      });

      store.dispatch(CurrentScheduleActions.upload.request(new FormData()));

      await waitFor(() => expect(request?.headers?.get('Authorization')).toEqual(`Bearer ${user.accessToken}`))
    })
  });
});
