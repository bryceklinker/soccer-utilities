import { RootState } from '../../state';
import { createSelector } from '@reduxjs/toolkit';
import { selectIsLoading } from '../../loading';
import { SettingsActions } from './settings-actions';

const selectSettingsState = (state: RootState) => state.settings;

export const selectSettings = createSelector(
  selectSettingsState,
  s => s.settings
);

export const selectIsLoadingSettings = selectIsLoading(SettingsActions.load.request);
