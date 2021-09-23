import { Entity, EntityType, Repository, RepositoryQuery } from '../lib';
import * as faker from 'faker';
import { selectAllQuery } from '../lib/standard-queries';

export class TestingRepository<T extends Entity> implements Repository<T> {
  constructor(private readonly entityType: EntityType<T>) {}

  private readonly entities: Array<T> = [];
  private readonly queries: Array<RepositoryQuery> = [];

  getExecutedQueries(): Array<RepositoryQuery> {
    return this.queries;
  }

  async getAll(): Promise<Array<T>> {
    return await this.query(selectAllQuery(this.entityType));
  }

  query(query: RepositoryQuery): Promise<Array<T>> {
    this.queries.push(query);
    return Promise.resolve(this.entities);
  }

  getById(id: string): Promise<T> {
    return Promise.resolve(this.entities.find((e) => e.id === id));
  }

  create(entity: T): Promise<T> {
    const created = { ...entity, id: faker.datatype.uuid() };
    this.entities.push(created);
    return Promise.resolve(created);
  }

  async update(entity: T): Promise<T> {
    const existing = await this.getById(entity.id);
    if (!existing) {
      return this.create(entity);
    }

    const existingIndex = this.entities.indexOf(existing);
    const updated = { ...existing, ...entity };
    this.entities.splice(existingIndex, 1);
    this.entities.push(updated);
    return updated;
  }
}
