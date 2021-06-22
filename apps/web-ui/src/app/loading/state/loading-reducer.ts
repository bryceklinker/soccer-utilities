import { LoadingState } from './loading-state';
import { AnyAction } from 'redux';
import { getAsyncActionSetBaseType, isFailedAction, isRequestAction, isSuccessAction } from '../../state';


export function loadingReducer(state: LoadingState | undefined = {}, action: AnyAction) {
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
