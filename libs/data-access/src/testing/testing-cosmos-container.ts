import {
  Conflict,
  Conflicts,
  Container,
  ContainerDefinition,
  ContainerResponse,
  Database, FeedOptions,
  Item,
  Items,
  OfferResponse,
  PartitionedQueryExecutionInfo,
  PartitionKey,
  PartitionKeyDefinition,
  PartitionKeyRange,
  QueryIterator,
  RequestOptions,
  ResourceResponse,
  Response,
  Scripts,
  SqlQuerySpec
} from '@azure/cosmos';
import { TestingCosmosDatabase } from './testing-cosmos-database';
import { NotImplementedException } from '@nestjs/common';
import { TestingCosmosItems } from './testing-cosmos-items';
import { TestingCosmosItem } from './testing-cosmos-item';
import { Entity } from '@soccer-utilities/data-access';

export class TestingCosmosContainer extends Container {
  private readonly testingItems: TestingCosmosItems;
  readonly database: Database;
  readonly id: string;

  get items(): Items {
    return this.testingItems as Items;
  }

  get scripts(): Scripts {
    throw new NotImplementedException();
  }

  get conflicts(): Conflicts {
    throw new NotImplementedException();
  }

  get url(): string {
    throw new NotImplementedException();
  }

  constructor(database: TestingCosmosDatabase, id: string) {
    super(database, id, null);
    this.testingItems = new TestingCosmosItems(this);
  }

  item(id: string, partitionKeyValue?: PartitionKey): Item {
    const resource = this.testingItems.getAll().find(i => i.id === id);
    return new TestingCosmosItem(this, id, resource);
  }

  setupItem<T extends Entity>(item: T) {
    this.testingItems.setupItem(item);
  }

  conflict(id: string, partitionKey?: PartitionKey): Conflict {
    throw new NotImplementedException();
  }

  read(options?: RequestOptions): Promise<ContainerResponse> {
    throw new NotImplementedException();
  }

  replace(
    body: ContainerDefinition,
    options?: RequestOptions
  ): Promise<ContainerResponse> {
    throw new NotImplementedException();
  }

  delete(options?: RequestOptions): Promise<ContainerResponse> {
    throw new NotImplementedException();
  }

  getPartitionKeyDefinition(): Promise<ResourceResponse<PartitionKeyDefinition>> {
    throw new NotImplementedException();
  }

  readPartitionKeyDefinition(): Promise<ResourceResponse<PartitionKeyDefinition>> {
    throw new NotImplementedException();
  }

  readOffer(options?: RequestOptions): Promise<OfferResponse> {
    throw new NotImplementedException();
  }

  getQueryPlan(
    query: string | SqlQuerySpec
  ): Promise<Response<PartitionedQueryExecutionInfo>> {
    throw new NotImplementedException();
  }

  readPartitionKeyRanges(
    feedOptions?: FeedOptions
  ): QueryIterator<PartitionKeyRange> {
    throw new NotImplementedException();
  }
}
