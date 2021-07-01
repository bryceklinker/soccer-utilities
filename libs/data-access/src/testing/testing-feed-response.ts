import { FeedResponse } from '@azure/cosmos';
import { NotImplementedException } from '@nestjs/common';

export class TestingFeedResponse<T> extends FeedResponse<T> {

  readonly resources: T[];
  readonly hasMoreResults: boolean;

  constructor(items: Array<T>) {
    super(items, null, false);
  }

  get continuation(): string {
    throw new NotImplementedException();
  }

  get continuationToken(): string {
    throw new NotImplementedException();
  }

  get queryMetrics(): string {
    throw new NotImplementedException();
  }

  get requestCharge(): number {
    throw new NotImplementedException();
  }

  get activityId(): string {
    throw new NotImplementedException();
  }
}
