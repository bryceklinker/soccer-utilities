import { FeedResponse, QueryIterator, SqlQuerySpec } from '@azure/cosmos';
import { NotImplementedException } from '@nestjs/common';
import { TestingFeedResponse } from './testing-feed-response';

export class TestingQueryIterator<T> extends QueryIterator<T> {

  constructor(private readonly items: Array<T>, query: string | SqlQuerySpec) {
    super(null, query, null, null);
  }


  fetchAll(): Promise<FeedResponse<T>> {
    return Promise.resolve(new TestingFeedResponse(this.items));
  }

  getAsyncIterator(): AsyncIterable<FeedResponse<T>> {
    throw new NotImplementedException();
  }

  hasMoreResults(): boolean {
    throw new NotImplementedException();
  }

  fetchNext(): Promise<FeedResponse<T>> {
    throw new NotImplementedException();
  }

  reset() {

  }
}
