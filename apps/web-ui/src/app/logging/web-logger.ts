import {
  ApplicationInsights,
  SeverityLevel,
} from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { History } from 'history';
import { SettingsModel } from '../settings/state/settings-model';

let appInsights: ApplicationInsights;
let reactPlugin: ReactPlugin;

interface Properties {
  [key: string]: string;
}

function configure(history: History, settings: SettingsModel) {
  reactPlugin = new ReactPlugin();
  appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: settings.logging.instrumentationKey,
      extensions: [reactPlugin],
      extensionConfig: {
        [reactPlugin.identifier]: { history: history },
      },
      autoTrackPageVisitTime: true,
      enableAutoRouteTracking: true,
      enableAjaxErrorStatusText: true,
      enableAjaxPerfTracking: true,
      enableUnhandledPromiseRejectionTracking: true,
    },
  });
  appInsights.loadAppInsights();
}

function info(message: string, properties: Properties) {
  console.info(message, properties);
  appInsights?.trackTrace({
    message,
    severityLevel: SeverityLevel.Information,
    properties,
  });
}

function error(message: string, error: Error, properties: Properties) {
  console.error(message, properties);
  appInsights?.trackException({
    exception: error,
    severityLevel: SeverityLevel.Error,
    properties: {
      message,
      ...properties,
    },
  });
  appInsights?.trackTrace({
    message,
    severityLevel: SeverityLevel.Error,
    properties,
  });
}

function warn(message: string, properties: Properties) {
  console.warn(message, properties);
  appInsights?.trackTrace({
    message,
    severityLevel: SeverityLevel.Warning,
    properties,
  });
}

function time(label: string) {
  console.time(label);
  appInsights?.startTrackEvent(label);
}

function timeEnd(label: string, properties?: Properties) {
  console.timeEnd(label);
  appInsights?.stopTrackEvent(label, properties);
}

export const WebLogger = {
  configure,
  info,
  error,
  warn,
  time,
  timeEnd,
};
