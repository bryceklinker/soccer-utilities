import {createReducer} from '@reduxjs/toolkit';
import { SettingsState } from './settings-state';
import { SettingsActions } from './settings-actions';

const initialState: SettingsState = {settings: null};
export const settingsReducer = createReducer(initialState,
  builder => builder
    .addCase(SettingsActions.load.success, (state, {payload}) => ({...state, settings: payload}))
)
