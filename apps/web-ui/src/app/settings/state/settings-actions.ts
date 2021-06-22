import { createAsyncActionSet, emptyPrepare } from '../../state';
import { SettingsModel } from './settings-model';

export const SettingsActions = {
  load: createAsyncActionSet('[Settings] Load',
    emptyPrepare,
    (settings: SettingsModel) => ({ payload: settings }),
    emptyPrepare
  )
};
