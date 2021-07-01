import { TestingCosmosClient, TestingCosmosContainer, TestingCosmosDatabase } from '../testing';
import { CosmosRepository } from './cosmos-repository';
import { Entity } from '@soccer-utilities/data-access';

class TestingEntity implements Entity {
  type = 'testing';
}

describe('CosmosRepository', () => {
  let container: TestingCosmosContainer;
  let repository: CosmosRepository<TestingEntity>;

  beforeEach(() => {
    const client = new TestingCosmosClient();
    const database = client.setupDatabase('bsc');
    container = database.setupContainer('entities');

    repository = new CosmosRepository<TestingEntity>(client, { database: 'bsc', collection: 'entities' });
  });

  test('when getting all from repository then reads all entities from cosmos', async () => {
    container.setupItem(new TestingEntity());
    container.setupItem(new TestingEntity());
    container.setupItem(new TestingEntity());

    const entities = await repository.getAll();

    expect(entities).toHaveLength(3);
  });
});
