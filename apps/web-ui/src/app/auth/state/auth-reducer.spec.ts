import { generateStateFromActions, WebUiModelFactory } from '../../../testing';
import { authReducer } from './auth-reducer';
import { AuthActions } from './auth-actions';

describe('authReducer', () => {
  test('when user loads successfully then state has user', () => {
    const user = WebUiModelFactory.createAuthUser();

    const state = generateStateFromActions(
      authReducer,
      AuthActions.loadUser.success(user)
    );

    expect(state.authUser).toEqual(user);
  });

  test('when roles load successfully then state has roles', () => {
    const user = WebUiModelFactory.createUser();

    const state = generateStateFromActions(
      authReducer,
      AuthActions.loadRoles.success(user)
    );

    expect(state.currentUser).toEqual(user);
  });
});
