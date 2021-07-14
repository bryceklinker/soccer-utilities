import { Action } from 'redux';
import { ApplicationUser } from '../app/auth/state/auth-models';
import { SettingsModel } from '../app/settings/state/settings-model';
import { createSagaTestingStore, TestingStore } from './create-testing-store-from-state';
import { AuthActions } from '../app/auth/state/auth-actions';
import { SettingsActions } from '../app/settings/state/settings-actions';
import { WebUiModelFactory } from './web-ui-model-factory';

export interface SetupSagaTestOptions {
  user?: ApplicationUser;
  settings?: SettingsModel;
  actions?: Array<Action>;
}

export interface SetupSagaTestResult {
  store: TestingStore;
  user: ApplicationUser,
  settings: SettingsModel,
  apiUrl: string;
}

export function setupSagaTest({user, settings, actions = []}: SetupSagaTestOptions = {}): SetupSagaTestResult {
  const actualSettings = settings || WebUiModelFactory.createSettings();
  const actualUser = user || WebUiModelFactory.createUser();
  const store = createSagaTestingStore(
    SettingsActions.load.success(actualSettings),
    AuthActions.loadUser.success(actualUser),
    ...actions);
  return {store, user: actualUser, settings: actualSettings, apiUrl: actualSettings.api.url};
}
