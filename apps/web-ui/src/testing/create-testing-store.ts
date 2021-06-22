import { Action } from 'redux';
import createMockStore, { MockStore } from 'redux-mock-store';
import { RootState } from '../app/state/root-state';
import { generateRootStateFromActions } from './generate-state-from-actions';

export function createTestingStore(...actions: Array<Action>): MockStore<RootState> {
  const state = generateRootStateFromActions(...actions);
  return createMockStore<RootState>([])(state);
}
