import { AnyAction } from 'redux';
import { createSelector } from '@reduxjs/toolkit';
import { loadingInitialState } from './loading-reducer';
import { RootState } from '../../state/root-state';
import { getAsyncActionSetBaseType } from '../../state/create-async-action-set';

const selectLoadingState = (state: RootState) =>
  state?.loading || loadingInitialState;

export const selectIsLoading = (action: AnyAction) =>
  createSelector(
    selectLoadingState,
    (state) => state[getAsyncActionSetBaseType(action)] > 0
  );
