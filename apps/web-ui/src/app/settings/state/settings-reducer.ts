import { createReducer } from '@reduxjs/toolkit';
import { SettingsActions } from './settings-actions';
import { SettingsState } from './settings-state';

export const settingsInitialState: SettingsState = { settings: null };
export const settingsReducer = createReducer(settingsInitialState, (builder) =>
  builder.addCase(SettingsActions.load.success, (state, { payload }) => ({
    ...state,
    settings: payload,
  }))
);
