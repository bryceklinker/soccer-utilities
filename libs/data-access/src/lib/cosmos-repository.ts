import { Container, CosmosClient } from '@azure/cosmos';
import { DataAccessOptions } from './data-access-options';

export class CosmosRepository<T> {
  private get databaseName(): string {
    return this.options.database;
  }

  private get collectionName(): string {
    return this.options.collection;
  }

  constructor(private readonly client: CosmosClient, private readonly options: DataAccessOptions) {

  }

  async getAll() {
    const container = this.getEntitiesContainer();
    const response = await container.items.readAll().fetchAll();
    return response.resources;
  }

  private getEntitiesContainer(): Container {
    const database = this.client.database(this.databaseName);
    return database.container(this.collectionName);
  }
}
