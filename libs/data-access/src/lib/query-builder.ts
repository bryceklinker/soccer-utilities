import { RepositoryQuery } from './repository-query';
import { Entity, EntityType } from './entity';
import { QueryParameter } from './query-parameter';
import { QueryParameterValue } from './query-parameter-value';
import { QueryOperator } from './query-operator';

type PropertyType<T> = keyof T & string;

const BASE_SELECT = 'select * from c';
export class QueryBuilder<T extends Entity> {
  private readonly parameters: Array<QueryParameter> = [];

  constructor(private readonly entityType: EntityType<T>) {
    this.where('type', entityType.type);
  }

  where(
    property: PropertyType<T>,
    value: QueryParameterValue,
    operator: QueryOperator = QueryOperator.Equal
  ): QueryBuilder<T> {
    this.parameters.push({ name: property, value, operator });
    return this;
  }

  whereEqual(
    property: PropertyType<T>,
    value: QueryParameterValue
  ): QueryBuilder<T> {
    return this.where(property, value);
  }

  whereLessThan(
    property: PropertyType<T>,
    value: QueryParameterValue
  ): QueryBuilder<T> {
    return this.where(property, value, QueryOperator.LessThan);
  }

  whereGreaterThan(
    property: PropertyType<T>,
    value: QueryParameterValue
  ): QueryBuilder<T> {
    return this.where(property, value, QueryOperator.GreaterThan);
  }

  whereLessThanOrEqual(
    property: PropertyType<T>,
    value: QueryParameterValue
  ): QueryBuilder<T> {
    return this.where(property, value, QueryOperator.LessThanOrEqual);
  }

  whereGreaterThanOrEqual(
    property: PropertyType<T>,
    value: QueryParameterValue
  ): QueryBuilder<T> {
    return this.where(property, value, QueryOperator.GreaterThanOrEqual);
  }

  whereLike(
    property: PropertyType<T>,
    value: QueryParameterValue
  ): QueryBuilder<T> {
    return this.where(property, value, QueryOperator.Like);
  }

  build(): RepositoryQuery {
    const wheres = this.parameters
      .map((p) => `c.${p.name} ${p.operator} @${p.name}`)
      .join(' and ');
    return {
      text: `${BASE_SELECT} where ${wheres}`,
      parameters: this.parameters.map((p) => ({
        name: `@${p.name}`,
        value: p.value,
        operator: p.operator,
      })),
    };
  }
}
