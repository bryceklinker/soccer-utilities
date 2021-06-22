import { getAsyncActionSetBaseType, RootState } from '../../state';
import { AnyAction } from 'redux';
import { createSelector } from '@reduxjs/toolkit';

const selectLoadingState = (state: RootState) => state.loading;

export const selectIsLoading = (action:AnyAction) => createSelector(
  selectLoadingState,
  state => state[getAsyncActionSetBaseType(action)] > 0
);
