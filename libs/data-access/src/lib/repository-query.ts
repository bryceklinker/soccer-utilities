import { QueryParameter } from './query-parameter';

export interface RepositoryQuery {
  text: string;
  parameters: Array<QueryParameter>;
}
