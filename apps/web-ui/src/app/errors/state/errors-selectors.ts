import { AnyAction } from 'redux';
import { createSelector } from '@reduxjs/toolkit';
import { errorsInitialState } from './errors-reducer';
import { RootState } from '../../state/root-state';
import { getAsyncActionSetBaseType } from '../../state/create-async-action-set';

const selectErrorsState = (state: RootState) => state?.errors || errorsInitialState;

export const selectErrors = (action: AnyAction) => createSelector(
  selectErrorsState,
  state => state[getAsyncActionSetBaseType(action)]
);

export const selectHasErrors = (action: AnyAction) => createSelector(
  selectErrors(action),
  errors => errors?.length > 0
);
