import {
  Container,
  Containers,
  CosmosClient,
  Database,
  DatabaseResponse,
  OfferResponse,
  RequestOptions,
  User,
  Users,
} from '@azure/cosmos';
import { TestingCosmosClient } from './testing-cosmos-client';
import { TestingCosmosContainer } from './testing-cosmos-container';
import { NotFoundException, NotImplementedException } from '@nestjs/common';

export class TestingCosmosDatabase extends Database {
  private readonly configuredContainers: Array<TestingCosmosContainer>;
  readonly client: CosmosClient;
  readonly id: string;
  readonly containers: Containers;
  readonly users: Users;

  get url(): string {
    return super.url;
  }

  constructor(client: TestingCosmosClient, id: string) {
    super(client, id, null);
    this.configuredContainers = [];
  }

  container(id: string): Container {
    const container = this.configuredContainers.find((c) => c.id === id);
    if (container) {
      return container;
    }

    throw new NotFoundException(`Could not find container with id ${id}`);
  }

  setupContainer(id: string): TestingCosmosContainer {
    const container = new TestingCosmosContainer(this, id);
    this.configuredContainers.push(container);
    return container;
  }

  user(id: string): User {
    throw new NotImplementedException();
  }

  read(options?: RequestOptions): Promise<DatabaseResponse> {
    throw new NotImplementedException();
  }

  delete(options?: RequestOptions): Promise<DatabaseResponse> {
    throw new NotImplementedException();
  }

  readOffer(options?: RequestOptions): Promise<OfferResponse> {
    throw new NotImplementedException();
  }
}
