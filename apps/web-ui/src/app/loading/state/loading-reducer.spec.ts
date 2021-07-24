import { generateStateFromActions, WebUiModelFactory } from '../../../testing';
import { loadingReducer } from './loading-reducer';
import { AuthActions } from '../../auth/state/auth-actions';

describe('loadingReducer', () => {
  test('when request action received then action type count incremented', () => {
    const state = generateStateFromActions(
      loadingReducer,
      AuthActions.loadUser.request()
    );

    expect(state[AuthActions.loadUser.baseType]).toEqual(1);
  });

  test('when multiple requests received then action type count is incremented for each request', () => {
    const state = generateStateFromActions(
      loadingReducer,
      AuthActions.loadUser.request(),
      AuthActions.loadUser.request(),
      AuthActions.loadUser.request()
    );

    expect(state[AuthActions.loadUser.baseType]).toEqual(3);
  });

  test('when success action received then decrements action type count', () => {
    const state = generateStateFromActions(
      loadingReducer,
      AuthActions.loadUser.request(),
      AuthActions.loadUser.success(WebUiModelFactory.createUser())
    );

    expect(state[AuthActions.loadUser.baseType]).toEqual(0);
  });

  test('when failed action received then decrements action type count', () => {
    const state = generateStateFromActions(
      loadingReducer,
      AuthActions.loadUser.request(),
      AuthActions.loadUser.failed()
    );

    expect(state[AuthActions.loadUser.baseType]).toEqual(0);
  });

  test('when many success actions received then decrements action type count to minimum of zero', () => {
    const state = generateStateFromActions(
      loadingReducer,
      AuthActions.loadUser.request(),
      AuthActions.loadUser.success(WebUiModelFactory.createUser()),
      AuthActions.loadUser.success(WebUiModelFactory.createUser()),
      AuthActions.loadUser.success(WebUiModelFactory.createUser())
    );

    expect(state[AuthActions.loadUser.baseType]).toEqual(0);
  });
});
