import { createRestApi, RestApi } from '@soccer-utilities/core';
import { Action } from 'redux';
import { call, put, select } from 'redux-saga/effects';
import { selectSettingsApiUrl } from '../settings/state/settings-selectors';
import { selectUserAccessToken } from '../auth/state/auth-selectors';
import { WebLogger } from '../logging/web-logger';

export function* restApiEffect<TSuccess, TFailed = unknown>(
  http: (restApi: RestApi) => Promise<TSuccess>,
  success: (input: TSuccess) => Action | Action[],
  failed: (error: TFailed) => Action | Action[]
) {
  const apiUrl: string | undefined = yield select(selectSettingsApiUrl);
  const auth: string | undefined = yield select(selectUserAccessToken);

  if (apiUrl) {
    try {
      const restApi = createRestApi(apiUrl as string, auth);
      const result: TSuccess = yield call(http, restApi);

      yield dispatchActions(success(result));
    } catch (error) {
      WebLogger.error('Rest api failed', error, { apiUrl });
      yield dispatchActions(failed(error));
    }
  } else {
    WebLogger.warn('Rest api effect executed without api url', {
      apiUrl: apiUrl || '',
    });
  }
}

function* dispatchActions(actions: Action | Action[]) {
  const actionsToPut = Array.isArray(actions) ? actions : [actions];
  for (let i = 0; i < actionsToPut.length; i++) {
    yield put(actionsToPut[i]);
  }
}
