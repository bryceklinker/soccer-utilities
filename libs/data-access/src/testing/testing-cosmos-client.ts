import {
  CosmosClient,
  Database,
  DatabaseAccount,
  Databases, Offer,
  Offers,
  RequestOptions,
  ResourceResponse
} from '@azure/cosmos';
import { NotFoundException, NotImplementedException } from '@nestjs/common';
import { TestingCosmosDatabase } from './testing-cosmos-database';

export class TestingCosmosClient extends CosmosClient {
  readonly configuredDatabases: Array<TestingCosmosDatabase>;
  readonly databases: Databases;
  readonly offers: Offers;

  constructor() {
    super({ endpoint: 'https://accountname.documents.azure.com:443/', key: ''});
    this.configuredDatabases = [];
  }

  database(id: string): Database {
    const database = this.configuredDatabases.find(d => d.id === id);
    if (database) {
      return database;
    }

    throw new NotFoundException(`Could not find database with id ${id}`);
  }

  setupDatabase(id: string): TestingCosmosDatabase {
    const database = new TestingCosmosDatabase(this, id);
    this.configuredDatabases.push(database);
    return database;
  }

  getDatabaseAccount(options?: RequestOptions): Promise<ResourceResponse<DatabaseAccount>> {
    throw new NotImplementedException();
  }

  getWriteEndpoint(): Promise<string> {
    throw new NotImplementedException();
  }

  getReadEndpoint(): Promise<string> {
    throw new NotImplementedException();
  }

  offer(id: string): Offer {
    throw new NotImplementedException();
  }
}
