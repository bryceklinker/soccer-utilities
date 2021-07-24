import * as FormData from 'form-data';
import axios from 'axios';
import { constants } from 'http2';
import {
  readSampleGameScheduleAsStream,
  ModelFactory,
} from '@soccer-utilities/testing-support';
import { GameScheduleEntity } from '@soccer-utilities/schedules-api';

import { GameScheduleModel } from '@soccer-utilities/models';
import { ApiFixture } from '../../testing/api-fixture';
import { TestingRepository } from '@soccer-utilities/data-access/testing';

describe('Schedules Api', () => {
  let fixture: ApiFixture;
  let repository: TestingRepository<GameScheduleEntity>;

  beforeEach(async () => {
    fixture = new ApiFixture();
    await fixture.start();

    repository = fixture.repositoryFactory.setupRepository(GameScheduleEntity);
  });

  test('when getting current schedule and current schedule missing then returns not found', async () => {
    const response = await axios.get('/schedules/current', {
      baseURL: fixture.baseUrl,
    });

    expect(response.status).toEqual(constants.HTTP_STATUS_NOT_FOUND);
  });

  test('when schedule uploaded then returns created schedule', async () => {
    const form = new FormData();
    form.append('scheduleFile', readSampleGameScheduleAsStream());

    const response = await axios.post('/schedules/current', form, {
      baseURL: fixture.baseUrl,
      headers: { ...form.getHeaders(), 'Content-Type': 'multipart/form-data' },
    });

    expect(response.status).toEqual(constants.HTTP_STATUS_CREATED);
    expect(await repository.getAll()).toHaveLength(1);
  });

  test('when getting current schedule and current schedule exists then returns current schedule', async () => {
    const { id } = await repository.create(
      GameScheduleEntity.fromModel(ModelFactory.createGameSchedule())
    );

    const response = await axios.get<GameScheduleModel>('/schedules/current', {
      baseURL: fixture.baseUrl,
    });

    expect(response.status).toEqual(constants.HTTP_STATUS_OK);
    expect(response.data.id).toEqual(id);
  });

  afterEach(async () => {
    await fixture.stop();
  });
});
