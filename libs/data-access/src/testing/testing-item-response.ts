import { Item, ItemResponse, Resource } from '@azure/cosmos';
import { TestingCosmosItem } from './testing-cosmos-item';

export class TestingItemResponse<T extends Resource> extends ItemResponse<T> {
  readonly item: Item;

  constructor(resource: T, item: TestingCosmosItem) {
    super(resource, null, 200, 200, item);
  }

  get requestCharge(): number {
    return super.requestCharge;
  }

  get activityId(): string {
    return super.activityId;
  }

  get etag(): string {
    return super.etag;
  }
}
