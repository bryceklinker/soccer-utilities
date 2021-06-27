import { AnyAction } from 'redux';
import { getAsyncActionSetBaseType, isFailedAction, isRequestAction, isSuccessAction } from '../../state/create-async-action-set';
import { LoadingState } from './loading-state';

export const loadingInitialState: LoadingState = {};
export function loadingReducer(state: LoadingState | undefined = loadingInitialState, action: AnyAction) {
  const baseType = getAsyncActionSetBaseType(action);
  const count = state[baseType] || 0;
  if (isRequestAction(action)) {
    return {...state, [baseType]: count + 1};
  }

  if (isSuccessAction(action) || isFailedAction(action)) {
    return {...state, [baseType]: count <= 0 ? 0 : count - 1};
  }

  return state;
}
