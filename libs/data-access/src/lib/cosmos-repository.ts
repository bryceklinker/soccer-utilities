import { Container, CosmosClient, SqlQuerySpec } from '@azure/cosmos';
import { DataAccessOptions } from './data-access-options';
import { Type } from '@nestjs/common';
import { Repository } from './repository';
import { EntityType } from './entity';

function selectAllQuery(type: string): SqlQuerySpec {
  return {
    query: 'select * from root where type = @type',
    parameters: [
      {name: '@type', value: type}
    ]
  }
}

export class CosmosRepository<T> implements Repository<T> {
  private get databaseName(): string {
    return this.options.database;
  }

  private get collectionName(): string {
    return this.options.collection;
  }

  private get entityType(): string {
    return this.entityClass.type;
  }

  constructor(private readonly client: CosmosClient,
              private readonly options: DataAccessOptions,
              private readonly entityClass: EntityType<T>) {

  }

  async getAll(): Promise<Array<T>> {
    const container = this.getEntitiesContainer();
    const response = await container.items
      .query<T>(selectAllQuery(this.entityType))
      .fetchAll();
    return response.resources;
  }

  async getById(id: string): Promise<T> {
    const container = this.getEntitiesContainer();
    const response = await container.item(id).read<T>();
    return response.resource;
  }

  private getEntitiesContainer(): Container {
    const database = this.client.database(this.databaseName);
    return database.container(this.collectionName);
  }
}
