import { generateStateFromActions, ModelFactory } from '../../../testing';
import { SettingsActions } from './settings-actions';
import { settingsReducer } from './settings-reducer';

describe('settingsReducer', () => {
  test('when settings loaded successfully then state has settings', () => {
    const settings = ModelFactory.createSettings();
    const state = generateStateFromActions(settingsReducer, SettingsActions.load.success(settings));

    expect(state.settings).toEqual(settings);
  });
});
