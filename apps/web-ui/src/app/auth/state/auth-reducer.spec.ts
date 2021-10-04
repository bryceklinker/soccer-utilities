import { generateStateFromActions, WebUiModelFactory } from '../../../testing';
import { authReducer } from './auth-reducer';
import { AuthActions } from './auth-actions';

describe('authReducer', () => {
  test('when user loads successfully then state has user', () => {
    const user = WebUiModelFactory.createAuthUser();

    const state = generateStateFromActions(
      authReducer,
      AuthActions.loadAuthUser.success(user)
    );

    expect(state.authUser).toEqual(user);
  });

  test('when roles load successfully then state has roles', () => {
    const user = WebUiModelFactory.createUser();

    const state = generateStateFromActions(
      authReducer,
      AuthActions.loadCurrentUser.success(user)
    );

    expect(state.currentUser).toEqual(user);
  });

  test('when user logs out then clears users', () => {
    const authUser = WebUiModelFactory.createAuthUser();
    const user = WebUiModelFactory.createUser();

    const state = generateStateFromActions(
      authReducer,
      AuthActions.loadAuthUser.success(authUser),
      AuthActions.loadCurrentUser.success(user),
      AuthActions.logout()
    );

    expect(state.currentUser).toEqual(null);
    expect(state.authUser).toEqual(null);
  });
});
