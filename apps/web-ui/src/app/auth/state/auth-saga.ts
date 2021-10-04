import { takeEvery } from 'redux-saga/effects';
import { UserModel } from '@soccer-utilities/models';
import { AuthActions } from './auth-actions';
import { restApiEffect } from '../../state/rest-api-effect';

function* loadRoles() {
  yield restApiEffect<UserModel>(
    (restApi) => restApi.get('/users/current'),
    (user) => AuthActions.loadCurrentUser.success(user),
    AuthActions.loadCurrentUser.failed
  );
}

export function* authSaga() {
  yield takeEvery(AuthActions.loadCurrentUser.request, loadRoles);
}
