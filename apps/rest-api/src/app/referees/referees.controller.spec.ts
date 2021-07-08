import { INestApplication } from '@nestjs/common';
import { TestingRepository, TestingRepositoryFactory } from '@soccer-utilities/data-access/testing';
import { GameScheduleEntity } from '@soccer-utilities/schedules-api';
import { startApp } from '../../testing/start-app';
import { RepositoryFactory } from '@soccer-utilities/data-access';
import { ModelFactory } from '@soccer-utilities/core/testing';
import axios from 'axios';
import { List, RefereeCheckModel } from '@soccer-utilities/core';
import { constants } from 'http2';

describe('Referees Api', () => {
  let app: INestApplication;
  let repository: TestingRepository<GameScheduleEntity>;
  let baseUrl: string;

  beforeEach(async () => {
    app = await startApp();

    repository = (app.get(RepositoryFactory) as TestingRepositoryFactory)
      .setupRepository(GameScheduleEntity);
    baseUrl = await app.getUrl();
  });

  test('when getting referee checks then returns referee checks', async () => {
    await repository.create(GameScheduleEntity.fromModel(ModelFactory.createGameSchedule()));

    const response = await axios.get<List<RefereeCheckModel>>('/referees/checks', {baseURL: baseUrl});

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
        }),
      ]
    })));

    const response = await axios.get<List<RefereeCheckModel>>('/referees/checks?start=2020-05-01&end=2020-05-31', {baseURL: baseUrl});

    expect(response.status).toEqual(constants.HTTP_STATUS_OK);
    expect(response.data.items).toHaveLength(1);
  })

  afterEach(async () => {
    await app.close();
  })
});
