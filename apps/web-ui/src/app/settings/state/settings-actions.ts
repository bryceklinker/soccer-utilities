import { SettingsModel } from './settings-model';
import { createAsyncActionSet, emptyPrepare } from '../../state/create-async-action-set';

export const SettingsActions = {
  load: createAsyncActionSet('[Settings] Load',
    emptyPrepare,
    (settings: SettingsModel) => ({ payload: settings }),
    emptyPrepare
  )
};
