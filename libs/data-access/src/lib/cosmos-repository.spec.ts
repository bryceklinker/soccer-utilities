import { TestingCosmosClient, TestingCosmosContainer } from '../testing';
import { CosmosRepository } from './cosmos-repository';
import * as faker from 'faker';
import { TestingEntity } from '../testing/testing.entity';

describe('CosmosRepository', () => {
  let container: TestingCosmosContainer;
  let repository: CosmosRepository<TestingEntity>;

  beforeEach(() => {
    const client = new TestingCosmosClient();
    const database = client.setupDatabase('bsc');
    container = database.setupContainer('entities');

    const options = { database: 'bsc', collection: 'entities' };
    repository = new CosmosRepository<TestingEntity>(
      client,
      options,
      TestingEntity);
  });

  test('when getting all from repository then reads all entities from cosmos', async () => {
    container.setupItem(new TestingEntity(faker.datatype.uuid()));
    container.setupItem(new TestingEntity(faker.datatype.uuid()));
    container.setupItem(new TestingEntity(faker.datatype.uuid()));

    const entities = await repository.getAll();

    expect(entities).toHaveLength(3);
  });

  test('when getting entity by id then returns entity with matching id', async () => {
    const id = faker.datatype.uuid();
    container.setupItem(new TestingEntity(faker.datatype.uuid()))
    container.setupItem(new TestingEntity(id))
    container.setupItem(new TestingEntity(faker.datatype.uuid()))

    const entity = await repository.getById(id);

    expect(entity.id).toEqual(id);
  });
});
