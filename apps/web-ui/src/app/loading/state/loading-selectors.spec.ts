import { generateRootStateFromActions, ModelFactory } from '../../../testing';
import { AuthActions } from '../../auth';
import { selectIsLoading } from './loading-selectors';

describe('loading selectors', () => {
  test('when request action type is unfinished then is loading is true for action type', () => {
    const state = generateRootStateFromActions(AuthActions.loadUser.request());

    expect(selectIsLoading(AuthActions.loadUser.request)(state)).toEqual(true);
  })

  test('when no requests have been made then is loading is false for action type', () => {
    const state = generateRootStateFromActions();

    expect(selectIsLoading(AuthActions.loadUser.request)(state)).toEqual(false);
  })

  test('when some requests are still unfinished then is loading is true for action type', () => {
    const state = generateRootStateFromActions(
      AuthActions.loadUser.request(),
      AuthActions.loadUser.request(),
      AuthActions.loadUser.request(),
      AuthActions.loadUser.success(ModelFactory.createUser())
    );

    expect(selectIsLoading(AuthActions.loadUser.success)(state)).toEqual(true);
  })
})
