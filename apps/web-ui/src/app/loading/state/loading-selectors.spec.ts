import {
  generateRootStateFromActions,
  WebUiModelFactory,
} from '../../../testing';
import { selectIsLoading } from './loading-selectors';
import { AuthActions } from '../../auth/state/auth-actions';

describe('loading selectors', () => {
  test('when request action type is unfinished then is loading is true for action type', () => {
    const state = generateRootStateFromActions(
      AuthActions.loadAuthUser.request()
    );

    expect(selectIsLoading(AuthActions.loadAuthUser.request)(state)).toEqual(
      true
    );
  });

  test('when no requests have been made then is loading is false for action type', () => {
    const state = generateRootStateFromActions();

    expect(selectIsLoading(AuthActions.loadAuthUser.request)(state)).toEqual(
      false
    );
  });

  test('when some requests are still unfinished then is loading is true for action type', () => {
    const state = generateRootStateFromActions(
      AuthActions.loadAuthUser.request(),
      AuthActions.loadAuthUser.request(),
      AuthActions.loadAuthUser.request(),
      AuthActions.loadAuthUser.success(WebUiModelFactory.createAuthUser())
    );

    expect(selectIsLoading(AuthActions.loadAuthUser.success)(state)).toEqual(
      true
    );
  });
});
