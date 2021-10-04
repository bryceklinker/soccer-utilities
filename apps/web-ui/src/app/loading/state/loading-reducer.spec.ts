import { generateStateFromActions, WebUiModelFactory } from '../../../testing';
import { loadingReducer } from './loading-reducer';
import { AuthActions } from '../../auth/state/auth-actions';

describe('loadingReducer', () => {
  test('when request action received then action type count incremented', () => {
    const state = generateStateFromActions(
      loadingReducer,
      AuthActions.loadAuthUser.request()
    );

    expect(state[AuthActions.loadAuthUser.baseType]).toEqual(1);
  });

  test('when multiple requests received then action type count is incremented for each request', () => {
    const state = generateStateFromActions(
      loadingReducer,
      AuthActions.loadAuthUser.request(),
      AuthActions.loadAuthUser.request(),
      AuthActions.loadAuthUser.request()
    );

    expect(state[AuthActions.loadAuthUser.baseType]).toEqual(3);
  });

  test('when success action received then decrements action type count', () => {
    const state = generateStateFromActions(
      loadingReducer,
      AuthActions.loadAuthUser.request(),
      AuthActions.loadAuthUser.success(WebUiModelFactory.createAuthUser())
    );

    expect(state[AuthActions.loadAuthUser.baseType]).toEqual(0);
  });

  test('when failed action received then decrements action type count', () => {
    const state = generateStateFromActions(
      loadingReducer,
      AuthActions.loadAuthUser.request(),
      AuthActions.loadAuthUser.failed()
    );

    expect(state[AuthActions.loadAuthUser.baseType]).toEqual(0);
  });

  test('when many success actions received then decrements action type count to minimum of zero', () => {
    const state = generateStateFromActions(
      loadingReducer,
      AuthActions.loadAuthUser.request(),
      AuthActions.loadAuthUser.success(WebUiModelFactory.createAuthUser()),
      AuthActions.loadAuthUser.success(WebUiModelFactory.createAuthUser()),
      AuthActions.loadAuthUser.success(WebUiModelFactory.createAuthUser())
    );

    expect(state[AuthActions.loadAuthUser.baseType]).toEqual(0);
  });
});
