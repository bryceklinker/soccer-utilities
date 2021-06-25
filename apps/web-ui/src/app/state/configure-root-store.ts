import { configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

export function configureRootStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    devTools: true,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      [
        ...getDefaultMiddleware({thunk: false}),
        sagaMiddleware
      ]
  });
  sagaMiddleware.run(rootSaga);
  return store;
}
