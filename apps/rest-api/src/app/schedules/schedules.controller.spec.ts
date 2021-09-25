import * as FormData from 'form-data';
import { constants } from 'http2';
import {
  readSampleGameScheduleAsStream,
  ModelFactory,
} from '@soccer-utilities/testing-support';
import { GameScheduleEntity } from '@soccer-utilities/schedules-api';

import { GameScheduleModel } from '@soccer-utilities/models';
import { ApiFixture } from '../../testing/api-fixture';
import { TestingRepository } from '@soccer-utilities/data-access/testing';
import { RestApi } from '@soccer-utilities/core';
import axios from 'axios';
import { ADMIN_USER, CONCESSIONS_USER } from '../../testing/users';

describe('Schedules Api', () => {
  let restApi: RestApi;
  let fixture: ApiFixture;
  let repository: TestingRepository<GameScheduleEntity>;

  beforeEach(async () => {
    fixture = new ApiFixture();
    await fixture.start();

    repository = fixture.repositoryFactory.setupRepository(GameScheduleEntity);
    restApi = fixture.createRestApi(ADMIN_USER);
  });

  test('when non-admin gets schedule then rejects request', async () => {
    const response = await fixture
      .createRestApi(CONCESSIONS_USER)
      .getResponse('/schedules/current');

    expect(response.status).toEqual(constants.HTTP_STATUS_FORBIDDEN);
  });

  test('when getting current schedule and current schedule missing then returns not found', async () => {
    const response = await restApi.getResponse('/schedules/current');

    expect(response.status).toEqual(constants.HTTP_STATUS_NOT_FOUND);
  });

  test('when schedule uploaded then returns created schedule', async () => {
    const form = new FormData();
    form.append('scheduleFile', readSampleGameScheduleAsStream());

    const response = await axios.post('/schedules/current', form, {
      baseURL: fixture.baseUrl,
      headers: {
        ...form.getHeaders(),
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.stringify(ADMIN_USER)}`,
      },
    });

    expect(response.status).toEqual(constants.HTTP_STATUS_CREATED);
    expect(await repository.getAll()).toHaveLength(1);
  });

  test('when getting current schedule and current schedule exists then returns current schedule', async () => {
    const { id } = await repository.create(
      GameScheduleEntity.fromModel(ModelFactory.createGameSchedule())
    );

    const result = await restApi.get<GameScheduleModel>('/schedules/current');

    expect(result.id).toEqual(id);
  });

  afterEach(async () => {
    await fixture.stop();
  });
});
