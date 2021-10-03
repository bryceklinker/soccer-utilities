import { takeEvery } from 'redux-saga/effects';
import { UserModel } from '@soccer-utilities/models';
import { AuthActions } from './auth-actions';
import { restApiEffect } from '../../state/rest-api-effect';

function* loadRoles() {
  yield restApiEffect<UserModel>(
    (restApi) => restApi.get('/users/current'),
    (user) => AuthActions.loadRoles.success(user),
    AuthActions.loadRoles.failed
  );
}

export function* authSaga() {
  yield takeEvery(AuthActions.loadRoles.request, loadRoles);
}
