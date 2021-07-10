import { setupTestingModule } from '../../testing';
import { QueryBus } from '@nestjs/cqrs';
import { TestingRepository, TestingRepositoryFactory } from '@soccer-utilities/data-access/testing';
import { GameScheduleEntity } from '../entities';
import { ModelFactory } from '@soccer-utilities/testing-support';
import { GetCurrentScheduleQuery } from './get-current-schedule-query-handler';
import { RepositoryFactory } from '@soccer-utilities/data-access';

describe('GetCurrentScheduleQueryHandler', () => {
  let repository: TestingRepository<GameScheduleEntity>;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const app = await setupTestingModule();

    const repositoryFactory = app.get(RepositoryFactory) as TestingRepositoryFactory;

    repository = repositoryFactory.setupRepository(GameScheduleEntity);
    queryBus = app.get<QueryBus>(QueryBus);
  });

  test('when getting current schedule then returns first game schedule', async () => {
    const model = ModelFactory.createGameSchedule();
    const entity = await repository.create(GameScheduleEntity.fromModel(model));

    const actual = await queryBus.execute(new GetCurrentScheduleQuery());

    expect(actual).toEqual({
      ...model,
      id: entity.id,
      type: entity.type
    });
  });

  test('when current schedule is missing then returns null', async () => {
    const actual = await queryBus.execute(new GetCurrentScheduleQuery());

    expect(actual).toEqual(null);
  })
});
