import { createSelector } from '@reduxjs/toolkit';
import { SettingsActions } from './settings-actions';
import { settingsInitialState } from './settings-reducer';
import { RootState } from '../../state/root-state';
import { selectIsLoading } from '../../loading/state/loading-selectors';

const selectSettingsState = (state: RootState) => state?.settings || settingsInitialState;

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
