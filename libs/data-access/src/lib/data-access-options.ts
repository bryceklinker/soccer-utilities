export const DATA_ACCESS_OPTIONS_TOKEN = 'DATA_ACCESS_OPTIONS';
export interface DataAccessOptions {
  database: string;
  collection: string;
}

export interface CosmosOptions {
  endpoint: string;
  key: string;
}
