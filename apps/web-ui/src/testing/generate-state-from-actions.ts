import { Action, Reducer } from 'redux';
import { RootState } from '../app/state/root-state';
import { rootReducer } from '../app/state/root-reducer';

export function generateStateFromActions<TState>(reducer: Reducer<TState>, ...actions: Array<Action>): TState {
  const initialState: TState = reducer(undefined, {type: 'init'});
  return actions.reduce(reducer, initialState);
}

export function generateRootStateFromActions(...actions: Array<Action>): RootState {
  return generateStateFromActions(rootReducer, ...actions);
}
