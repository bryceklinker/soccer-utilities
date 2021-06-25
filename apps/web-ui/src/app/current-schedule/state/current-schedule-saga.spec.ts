import { waitFor } from '@testing-library/dom';
import { createSagaTestingStore, ModelFactory, TestingRestApiServer, TestingStore } from '../../../testing';
import { SettingsActions } from '../../settings';
import { CurrentScheduleActions } from './current-schedule-actions';
import { RestRequest } from 'msw';

describe('Current Schedule Saga', () => {
  let store: TestingStore;
  let apiUrl: string;

  beforeEach(() => {
    const settings = ModelFactory.createSettings();
    apiUrl = settings.api.url;

    store = createSagaTestingStore(SettingsActions.load.success(settings));
  });

  describe('Load Current Schedule', () => {
    test('when load current schedule requested then gets schedule from api', async () => {
      const schedule = ModelFactory.createGameSchedule();
      TestingRestApiServer.setupGet(`${apiUrl}/schedules/current`, schedule);

      store.dispatch(CurrentScheduleActions.load.request());

      await waitFor(() => {
        expect(store.getActions()).toContainEqual(CurrentScheduleActions.load.success(schedule));
      });
    });
  });

  describe('Upload Schedule', () => {
    test('when upload schedule requested then dispatches upload success', async () => {
      const form = new FormData();
      TestingRestApiServer.setupPost(`${apiUrl}/schedules/current`);

      store.dispatch(CurrentScheduleActions.upload.request(form));

      await waitFor(() => {
        expect(store.getActions()).toContainEqual(CurrentScheduleActions.upload.success());
      });
    });

    test('when upload schedule requested then uploads form to api', async () => {
      const form = new FormData();
      let request: RestRequest | null = null;
      TestingRestApiServer.setupPost(`${apiUrl}/schedules/current`, undefined, {
        captureRequest: req => request = req
      });

      store.dispatch(CurrentScheduleActions.upload.request(form));

      await waitFor(() => {
        expect(request?.body).toEqual(form);
      })
    })
  });
});
