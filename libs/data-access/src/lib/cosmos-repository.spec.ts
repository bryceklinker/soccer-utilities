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
      TestingEntity
    );
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
    container.setupItem(new TestingEntity(faker.datatype.uuid()));
    container.setupItem(new TestingEntity(id));
    container.setupItem(new TestingEntity(faker.datatype.uuid()));

    const entity = await repository.getById(id);

    expect(entity.id).toEqual(id);
  });

  test('when adding entity then returns newly added entity', async () => {
    const entity = new TestingEntity();

    const result = await repository.create(entity);

    expect(result.id).toBeDefined();
    expect(container.getAllEntities<TestingEntity>()).toContainEqual(result);
  });

  test('when updating entity then returns newly updated entity', async () => {
    container.setupItem(new TestingEntity('my-id'));

    const updated = new TestingEntity('my-id', 'new name');

    const result = await repository.update(updated);

    expect(result).toEqual(updated);
  });

  test('when updating missing entity then returns newly created entity', async () => {
    const entity = new TestingEntity();

    const result = await repository.update(entity);

    expect(result.id).toBeDefined();
    expect(container.getAllEntities<TestingEntity>()).toContainEqual(result);
  });
});
