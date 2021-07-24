import {
  getAsyncActionSetBaseType,
  isFailedAction,
  isSuccessAction,
} from '../../state/create-async-action-set';
import { AnyAction } from 'redux';
import { ErrorsState } from './errors-state';

export const errorsInitialState: ErrorsState = {};

export function errorsReducer(
  state: ErrorsState | undefined = errorsInitialState,
  action: AnyAction
): ErrorsState {
  const baseType = getAsyncActionSetBaseType(action);
  const errors = state[baseType] || [];
  if (isFailedAction(action)) {
    return { ...state, [baseType]: [...errors, action.payload] };
  }

  if (isSuccessAction(action)) {
    return { ...state, [baseType]: [] };
  }

  return state;
}
