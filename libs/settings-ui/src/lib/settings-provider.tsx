import { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { LoadingIndicator } from '@soccer-utilities/common-ui';
import { SettingsModel } from './settings-model';

const SettingsContext = createContext<SettingsModel | null>(null);

export function useSettings(): SettingsModel {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(`${useSettings.name} must be used under ${SettingsContext.displayName}.Provider`);
  }

  return context;
}

export const SettingsProvider: FunctionComponent = ({children}) => {
  const [settings, setSettings] = useState<SettingsModel | null>(null);

  useEffect(() => {
    let isSubscribed = true;

    axios.get<SettingsModel>('/settings.json')
      .then(res => {
        if (isSubscribed) {
          setSettings(res.data);
        }
      });
    return () => {isSubscribed = false};
  }, [setSettings]);
  return (
    <SettingsContext.Provider value={settings}>
      {
        settings == null ? <LoadingIndicator /> : children
      }
    </SettingsContext.Provider>
  )
}
