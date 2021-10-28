import { Entity } from './entity';
import { RepositoryQuery } from './repository-query';

export interface Repository<T extends Entity> {
  getAll(): Promise<Array<T>>;

  query(query: RepositoryQuery): Promise<Array<T>>;

  getById(id: string): Promise<T>;

  create(entity: T): Promise<T>;

  update(entity: T): Promise<T>;

  delete(id: string): Promise<void>;
}
