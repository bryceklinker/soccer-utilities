import { TestingRepository } from '@soccer-utilities/data-access/testing';
import { GameScheduleEntity } from '@soccer-utilities/schedules-api';
import { ModelFactory } from '@soccer-utilities/testing-support';
import axios from 'axios';
import { ListResult, RefereeCheckModel } from '@soccer-utilities/core';
import { constants } from 'http2';
import { ApiFixture } from '../../testing/api-fixture';

describe('Referees Api', () => {
  let fixture: ApiFixture;
  let repository: TestingRepository<GameScheduleEntity>;

  beforeEach(async () => {
    fixture = new ApiFixture();
    await fixture.start();

    repository = fixture.repositoryFactory.setupRepository(GameScheduleEntity);
  });

  test('when getting referee checks then returns referee checks', async () => {
    await repository.create(GameScheduleEntity.fromModel(ModelFactory.createGameSchedule()));

    const response = await axios.get<ListResult<RefereeCheckModel>>('/referees/checks', { baseURL: fixture.baseUrl });

    expect(response.status).toEqual(constants.HTTP_STATUS_OK);
    expect(response.data.items.length).toBeGreaterThan(0);
  });

  test('when getting referee checks for date range then returns referee checks for date range', async () => {
    await repository.create(GameScheduleEntity.fromModel(ModelFactory.createGameSchedule({
      games: [
        ModelFactory.createGame({
          date: '2020-05-01',
          referees: [ModelFactory.createReferee()]
        }),
        ModelFactory.createGame({
          date: '2020-06-01',
          referees: [ModelFactory.createReferee()]
        })
      ]
    })));

    const response = await axios.get<ListResult<RefereeCheckModel>>('/referees/checks?start=2020-05-01&end=2020-05-31', { baseURL: fixture.baseUrl });

    expect(response.status).toEqual(constants.HTTP_STATUS_OK);
    expect(response.data.items).toHaveLength(1);
  });

  afterEach(async () => {
    await fixture.stop();
  });
});
