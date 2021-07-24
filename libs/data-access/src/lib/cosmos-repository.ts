import { Container, CosmosClient } from '@azure/cosmos';
import { DataAccessOptions } from './data-access-options';
import { Repository } from './repository';
import { Entity, EntityType } from './entity';
import { selectAllQuery } from './standard-queries';

export class CosmosRepository<T extends Entity> implements Repository<T> {
  private get databaseName(): string {
    return this.options.database;
  }

  private get collectionName(): string {
    return this.options.collection;
  }

  private get entityType(): string {
    return this.entityClass.type;
  }

  constructor(
    private readonly client: CosmosClient,
    private readonly options: DataAccessOptions,
    private readonly entityClass: EntityType<T>
  ) {}

  async getAll(): Promise<Array<T>> {
    const container = this.getContainer();
    const response = await container.items
      .query<T>(selectAllQuery(this.entityType))
      .fetchAll();
    return response.resources;
  }

  async getById(id: string): Promise<T> {
    const container = this.getContainer();
    const response = await container.item(id).read<T>();
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

  private getContainer(): Container {
    const database = this.client.database(this.databaseName);
    return database.container(this.collectionName);
  }
}
