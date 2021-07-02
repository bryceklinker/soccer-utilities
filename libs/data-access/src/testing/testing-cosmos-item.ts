import { Container, Item, ItemDefinition, ItemResponse, RequestOptions, Resource } from '@azure/cosmos';
import { NotImplementedException } from '@nestjs/common';
import { TestingCosmosContainer } from './testing-cosmos-container';
import { TestingItemResponse } from './testing-item-response';

export class TestingCosmosItem extends Item {

  readonly container: Container;
  readonly id: string;

  get url(): string {
    throw new NotImplementedException();
  }

  constructor(container: TestingCosmosContainer, id: string, public resource?: any) {
    super(container, id, null, null);

  }

  read<T extends ItemDefinition = any>(options?: RequestOptions): Promise<ItemResponse<T>> {
    return Promise.resolve(this.toItemResponse<T>());
  }

  replace<T extends ItemDefinition>(body: T, options?: RequestOptions): Promise<ItemResponse<T>> {
    this.resource = {...body};
    return Promise.resolve(this.toItemResponse<T>());
  }

  delete<T extends ItemDefinition = any>(options?: RequestOptions): Promise<ItemResponse<T>> {
    this.resource = undefined;
    return Promise.resolve(this.toItemResponse<T>());
  }

  public toItemResponse<T>(): ItemResponse<T> {
    const resource = {
      ...this.resource,
      id: this.id
    };
    return new TestingItemResponse<T & Resource>(resource, this);
  }
}
