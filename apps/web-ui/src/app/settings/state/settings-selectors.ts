import { RootState } from '../../state';
import { createSelector } from '@reduxjs/toolkit';
import { selectIsLoading } from '../../loading';
import { SettingsActions } from './settings-actions';

const selectSettingsState = (state: RootState) => state.settings;

export const selectSettings = createSelector(
  selectSettingsState,
  s => s.settings
);

export const selectSettingsApiUrl = createSelector(
  selectSettings,
  settings => settings?.api?.url
);

export const selectIsLoadingSettings = createSelector(
  selectSettings,
  selectIsLoading(SettingsActions.load.request),
  (settings, isLoading) => isLoading || settings == null
)
