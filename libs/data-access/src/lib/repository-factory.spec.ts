import { CosmosClient } from '@azure/cosmos';
import { RepositoryFactory } from './repository-factory';
import { TestingCosmosClient, TestingEntity } from '../testing';
import { CosmosRepository } from './cosmos-repository';

describe('RepositoryFactory', () => {
  let client: CosmosClient;
  let factory: RepositoryFactory;

  beforeEach(() => {
    client = new TestingCosmosClient();
    factory = new RepositoryFactory(client, {
      database: 'bsc',
      collection: 'entities',
    });
  });

  test('when repository created then returns cosmos repository', () => {
    const repository = factory.create(TestingEntity);

    expect(repository).toBeInstanceOf(CosmosRepository);
  });
});
