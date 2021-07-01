import { Action } from 'redux';
import createMockStore, { MockStore } from 'redux-mock-store';
import { generateRootStateFromActions } from './generate-state-from-actions';
import createSagaMiddleware from 'redux-saga';
import { RootState } from '../app/state/root-state';
import { rootSaga } from '../app/state/root-saga';

export interface TestingStore extends MockStore<RootState> {

}

export function createTestingStore(...actions: Array<Action>): TestingStore {
  const state = generateRootStateFromActions(...actions);
  return createMockStore<RootState>([])(state);
}

export function createSagaTestingStore(...actions: Array<Action>): TestingStore {
  const sagaMiddleware = createSagaMiddleware();
  const state = generateRootStateFromActions(...actions);
  const store = createMockStore<RootState>([sagaMiddleware])(state);
  sagaMiddleware.run(rootSaga);
  return store;
}