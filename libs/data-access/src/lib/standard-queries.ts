import { Entity, EntityType } from '../lib/entity';
import { QueryBuilder } from './query-builder';
import { RepositoryQuery } from './repository-query';

export function selectAllQuery<T extends Entity>(
  entityType: EntityType<T>
): RepositoryQuery {
  return new QueryBuilder(entityType).build();
}
