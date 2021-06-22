export interface SettingsModel {
  api: {
    url: string;
  },
  auth: {
    domain: string;
    audience: string;
    clientId: string;
  }
}
