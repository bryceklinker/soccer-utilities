import { Container, CosmosClient, SqlQuerySpec } from '@azure/cosmos';
import { DataAccessOptions } from './data-access-options';
import { Repository } from './repository';
import { Entity, EntityType } from './entity';
import { selectAllQuery } from './standard-queries';
import { RepositoryQuery } from './repository-query';

const convertQueryToSqlQuery = (query: RepositoryQuery): SqlQuerySpec => ({
  query: query.text,
  parameters: query.parameters,
});

export class CosmosRepository<T extends Entity> implements Repository<T> {
  private get databaseName(): string {
    return this.options.database;
  }

  private get collectionName(): string {
    return this.options.collection;
  }

  constructor(
    private readonly client: CosmosClient,
    private readonly options: DataAccessOptions,
    private readonly entityClass: EntityType<T>
  ) {}

  async getAll(): Promise<Array<T>> {
    return await this.query(selectAllQuery(this.entityClass));
  }

  async query(query: RepositoryQuery): Promise<Array<T>> {
    const container = this.getContainer();
    const response = await container.items
      .query<T>(convertQueryToSqlQuery(query))
      .fetchAll();
    return response.resources;
  }

  async getById(id: string): Promise<T> {
    const container = this.getContainer();
    const response = await container.item(id, this.entityClass.type).read<T>();
    return response.resource;
  }

  async create(entity: T): Promise<T> {
    const container = this.getContainer();
    const result = await container.items.create<T>(entity);
    return result.resource;
  }

  async update(updated: T): Promise<T> {
    const container = this.getContainer();
    const result = await container.items.upsert<T>(updated);
    return result.resource;
  }

  async delete(id: string): Promise<void> {
    const container = this.getContainer();
    await container.item(id, this.entityClass.type).delete();
  }

  private getContainer(): Container {
    const database = this.client.database(this.databaseName);
    return database.container(this.collectionName);
  }
}
