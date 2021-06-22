import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

export function configureRootStore() {
  return configureStore({
    devTools: true,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: false
    })
  });
}
