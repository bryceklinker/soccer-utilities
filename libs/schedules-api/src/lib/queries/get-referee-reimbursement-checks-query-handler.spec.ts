import {
  TestingRepository,
  TestingRepositoryFactory,
} from '@soccer-utilities/data-access/testing';
import { GameScheduleEntity } from '@soccer-utilities/schedules-api';
import { QueryBus } from '@nestjs/cqrs';
import { setupTestingModule } from '../../testing';
import { RepositoryFactory } from '@soccer-utilities/data-access';
import { GetRefereeReimbursementChecksQuery } from './get-referee-reimbursement-checks-query-handler';
import { ModelFactory } from '@soccer-utilities/testing-support';
import { RefereeType } from '@soccer-utilities/models';

describe('GetRefereeReimbursementChecksQueryHandler', () => {
  let repository: TestingRepository<GameScheduleEntity>;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const app = await setupTestingModule();
    const repositoryFactory = app.get(
      RepositoryFactory
    ) as TestingRepositoryFactory;

    repository = repositoryFactory.setupRepository(GameScheduleEntity);
    queryBus = app.get<QueryBus>(QueryBus);
  });

  test('when current schedule is missing then returns empty', async () => {
    const result = await queryBus.execute(
      new GetRefereeReimbursementChecksQuery()
    );

    expect(result.items).toEqual([]);
  });

  test('when current schedule has games then returns checks for referees', async () => {
    await repository.create(
      GameScheduleEntity.fromModel(
        ModelFactory.createGameSchedule({
          games: [
            ModelFactory.createGame({
              ageGroup: ModelFactory.createAgeGroup({ age: 8 }),
              referees: [
                ModelFactory.createReferee({
                  name: 'Bob',
                  type: RefereeType.Center,
                }),
              ],
            }),
          ],
        })
      )
    );

    const result = await queryBus.execute(
      new GetRefereeReimbursementChecksQuery()
    );

    expect(result.items).toHaveLength(1);
    expect(result.items[0].referee).toEqual('Bob');
  });
});
