import {
  BulkOptions,
  ChangeFeedIterator,
  ChangeFeedOptions,
  Container,
  FeedOptions,
  ItemDefinition,
  ItemResponse,
  Items,
  OperationInput,
  OperationResponse,
  QueryIterator,
  RequestOptions,
  SqlQuerySpec,
} from '@azure/cosmos';
import { TestingCosmosContainer } from './testing-cosmos-container';
import { NotImplementedException } from '@nestjs/common';
import { TestingQueryIterator } from './testing-query-iterator';
import { TestingCosmosItem } from './testing-cosmos-item';
import * as faker from 'faker';

export class TestingCosmosItems extends Items {
  private readonly items: Array<TestingCosmosItem>;

  readonly container: Container;

  constructor(container: TestingCosmosContainer) {
    super(container, null);
    this.items = [];
  }

  getAll<T>() {
    return this.items;
  }

  setupItem<T extends ItemDefinition>(item: T) {
    this.items.push(
      new TestingCosmosItem(
        this.container as TestingCosmosContainer,
        item.id,
        item
      )
    );
  }

  query<T>(
    query: string | SqlQuerySpec,
    options?: FeedOptions
  ): QueryIterator<T> {
    return new TestingQueryIterator(
      this.items.map((i) => i.resource),
      query
    );
  }

  // @ts-ignore
  readChangeFeed<T>(
    changeFeedOptions?: ChangeFeedOptions
  ): ChangeFeedIterator<T> {
    throw new NotImplementedException();
  }

  // @ts-ignore
  changeFeed<T>(changeFeedOptions?: ChangeFeedOptions): ChangeFeedIterator<T> {
    throw new NotImplementedException();
  }

  readAll<T extends ItemDefinition>(options?: FeedOptions): QueryIterator<T> {
    return new TestingQueryIterator(
      this.items.map((i) => i.resource),
      ''
    );
  }

  create<T extends ItemDefinition = any>(
    body: T,
    options?: RequestOptions
  ): Promise<ItemResponse<T>> {
    const created = { ...body, id: faker.datatype.uuid() };
    const item = new TestingCosmosItem(
      this.container as TestingCosmosContainer,
      created.id,
      created
    );
    this.items.push(item);
    return Promise.resolve(item.toItemResponse<T>());
  }

  upsert<T extends ItemDefinition>(
    body: T,
    options?: RequestOptions
  ): Promise<ItemResponse<T>> {
    const existing = this.items.find((i) => i.id === body.id);
    if (!existing) {
      return this.create<T>(body, options);
    }

    const updated = { ...existing.resource, ...body };
    const item = new TestingCosmosItem(
      this.container as TestingCosmosContainer,
      updated.id,
      updated
    );
    this.items.splice(this.items.indexOf(existing), 1);
    this.items.push(item);
    return Promise.resolve(item.toItemResponse<T>());
  }

  bulk(
    operations: OperationInput[],
    bulkOptions?: BulkOptions,
    options?: RequestOptions
  ): Promise<OperationResponse[]> {
    throw new NotImplementedException();
  }
}
