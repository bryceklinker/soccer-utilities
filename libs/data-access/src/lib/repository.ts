import { Entity } from './entity';

export interface Repository<T extends Entity> {
  getAll(): Promise<Array<T>>;

  getById(id: string): Promise<T>;

  create(entity: T): Promise<T>;

  update(entity: T): Promise<T>;
}
