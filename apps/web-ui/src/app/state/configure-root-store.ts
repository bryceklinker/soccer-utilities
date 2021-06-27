import { configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';
import { CurrentScheduleActions } from '../current-schedule/state/current-schedule-actions';

export function configureRootStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    devTools: true,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      [
        ...getDefaultMiddleware({
          thunk: false,
          serializableCheck: {
            ignoredActions: [CurrentScheduleActions.upload.request.type]
          }
        }),
        sagaMiddleware
      ]
  });
  sagaMiddleware.run(rootSaga);
  return store;
}
