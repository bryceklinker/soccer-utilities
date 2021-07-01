import { generateStateFromActions, ModelFactory } from '../../../testing';
import { authReducer } from './auth-reducer';
import { AuthActions } from './auth-actions';

describe('authReducer', () => {
  test('when user loads successfully then state has user', () => {
    const user = ModelFactory.createUser();

    const state = generateStateFromActions(authReducer, AuthActions.loadUser.success(user));

    expect(state.user).toEqual(user);
  })
})