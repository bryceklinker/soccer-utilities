import { TestingRepository, TestingRepositoryFactory } from '@soccer-utilities/data-access/testing';
import { GameScheduleEntity } from '@soccer-utilities/schedules-api';
import { QueryBus } from '@nestjs/cqrs';
import { setupTestingModule } from '../../testing';
import { RepositoryFactory } from '@soccer-utilities/data-access';
import { GetRefereeChecksQuery } from './get-referee-checks-query-handler';
import { ModelFactory } from '@soccer-utilities/testing-support';
import { RefereeType } from '@soccer-utilities/core';

describe('GetRefereeChecksQueryHandler', () => {
  let repository: TestingRepository<GameScheduleEntity>;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const app = await setupTestingModule();

    const repositoryFactory = app.get(RepositoryFactory) as TestingRepositoryFactory;

    repository = repositoryFactory.setupRepository(GameScheduleEntity);
    queryBus = app.get<QueryBus>(QueryBus);
  });

  test('when current schedule is missing then returns empty', async () => {
    const result = await queryBus.execute(new GetRefereeChecksQuery());

    expect(result.items).toEqual([]);
  });

  test('when current schedule has games then returns referee checks for games', async () => {
    await repository.create(GameScheduleEntity.fromModel(ModelFactory.createGameSchedule({
      games: [
        ModelFactory.createGame({
          ageGroup: ModelFactory.createAgeGroup({ age: 8 }),
          referees: [
            ModelFactory.createReferee({ type: RefereeType.Center })
          ]
        })
      ]
    })));

    const result = await queryBus.execute(new GetRefereeChecksQuery());

    expect(result.items).toHaveLength(1);
    expect(result.items[0].amount).toEqual(15);
  });

  test('when using date range then returns referee checks for games in range', async () => {
    await repository.create(GameScheduleEntity.fromModel(ModelFactory.createGameSchedule({
      games: [
        ModelFactory.createGame({
          date: '2020-06-01',
          referees: [ModelFactory.createReferee()]
        }),
        ModelFactory.createGame({
          date: '2020-07-01',
          referees: [ModelFactory.createReferee()]
        })
      ]
    })));

    const result = await queryBus.execute(new GetRefereeChecksQuery({start: '2020-06-01', end: '2020-06-30'}));

    expect(result.items).toHaveLength(1);
  });
});
