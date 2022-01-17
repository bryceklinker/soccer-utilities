import { TestingRepository } from '@soccer-utilities/data-access/testing';
import { GameScheduleEntity } from '@soccer-utilities/schedules-api';
import { ModelFactory } from '@soccer-utilities/testing-support';
import {
  ListResult,
  RefereeCheckModel,
  RefereeReimbursementCheckModel,
} from '@soccer-utilities/models';
import { ApiFixture } from '../../testing/api-fixture';
import { RestApi } from '@soccer-utilities/core';
import { ADMIN_USER, CONCESSIONS_USER } from '../../testing/users';
import { constants } from 'http2';

describe('Referees Api', () => {
  let restApi: RestApi;
  let fixture: ApiFixture;
  let repository: TestingRepository<GameScheduleEntity>;

  beforeEach(async () => {
    fixture = new ApiFixture();
    await fixture.start();

    repository = fixture.repositoryFactory.setupRepository(GameScheduleEntity);
    restApi = fixture.createRestApi(ADMIN_USER);
  });

  test('when non-admin gets referee checks then returns unauthorized', async () => {
    const response = await fixture
      .createRestApi(CONCESSIONS_USER)
      .getResponse('/referees/checks');

    expect(response.status).toEqual(constants.HTTP_STATUS_FORBIDDEN);
  });

  test('when getting referee checks then returns referee checks', async () => {
    await repository.create(
      GameScheduleEntity.fromModel(ModelFactory.createGameSchedule())
    );

    const result = await restApi.get<ListResult<RefereeCheckModel>>(
      '/referees/checks'
    );

    expect(result.items.length).toBeGreaterThan(0);
  });

  test('when getting referee checks for date range then returns referee checks for date range', async () => {
    await repository.create(
      GameScheduleEntity.fromModel(
        ModelFactory.createGameSchedule({
          games: [
            ModelFactory.createGame({
              date: '2020-05-01',
              referees: [ModelFactory.createReferee()],
            }),
            ModelFactory.createGame({
              date: '2020-06-01',
              referees: [ModelFactory.createReferee()],
            }),
          ],
        })
      )
    );

    const result = await restApi.get<ListResult<RefereeCheckModel>>(
      '/referees/checks?start=2020-05-01&end=2020-05-31'
    );

    expect(result.items).toHaveLength(1);
  });

  test('when getting referee reimbursement checks then returns all reimbursement checks', async () => {
    await repository.create(
      GameScheduleEntity.fromModel(
        ModelFactory.createGameSchedule({
          games: [
            ModelFactory.createGame({
              ageGroup: ModelFactory.createAgeGroup({ age: 10 }),
              referees: [ModelFactory.createReferee({ name: 'Bob' })],
            }),
          ],
        })
      )
    );

    const result = await restApi.get<
      ListResult<RefereeReimbursementCheckModel>
    >('/referees/reimbursement-checks');

    expect(result.items).toHaveLength(1);
  });

  afterEach(async () => {
    await fixture.stop();
  });
});
