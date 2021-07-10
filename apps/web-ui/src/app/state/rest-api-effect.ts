import { createRestApi, RestApi } from '@soccer-utilities/core';
import { Action } from 'redux';
import { call, put, select } from 'redux-saga/effects';
import { selectSettingsApiUrl } from '../settings/state/settings-selectors';
import { selectUserAccessToken } from '../auth/state/auth-selectors';

export function* restApiEffect<TSuccess, TFailed = any>(
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
      yield dispatchActions(failed(error));
    }
  }
}


function* dispatchActions(actions: Action | Action[]) {
  const actionsToPut = Array.isArray(actions) ? actions : [actions];
  for (let i = 0; i < actionsToPut.length; i++) {
    yield put(actionsToPut[i]);
  }
}
