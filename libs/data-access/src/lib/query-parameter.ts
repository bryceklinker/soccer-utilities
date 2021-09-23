import { QueryParameterValue } from './query-parameter-value';
import { QueryOperator } from './query-operator';

export interface QueryParameter {
  name: string;
  operator: QueryOperator;
  value: QueryParameterValue;
}
