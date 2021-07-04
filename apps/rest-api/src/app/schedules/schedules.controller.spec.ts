import { startApp } from '../../testing/start-app';
import { INestApplication } from '@nestjs/common';
import * as FormData from 'form-data';
import axios from 'axios';
import { constants } from 'http2';
import { readSampleGameScheduleAsStream } from '@soccer-utilities/testing-support';
import { TestingRepository, TestingRepositoryFactory } from '@soccer-utilities/data-access/testing';
import { GameScheduleEntity } from '@soccer-utilities/schedules-api';
import { RepositoryFactory } from '@soccer-utilities/data-access';
import { ModelFactory } from '@soccer-utilities/core/testing';
import { GameScheduleModel } from '@soccer-utilities/core';

describe('SchedulesApi', () => {
  let app: INestApplication;
  let repository: TestingRepository<GameScheduleEntity>
  let baseUrl: string;

  beforeEach(async () => {
    app = await startApp();

    repository = (app.get(RepositoryFactory) as TestingRepositoryFactory)
      .setupRepository(GameScheduleEntity);
    baseUrl = await app.getUrl();
  });

  test('when getting current schedule and current schedule missing then returns not found', async () => {
    const response = await axios.get('/schedules/current', { baseURL: baseUrl });

    expect(response.status).toEqual(constants.HTTP_STATUS_NOT_FOUND);
  });

  test('when schedule uploaded then returns created schedule', async () => {
    const form = new FormData();
    form.append('scheduleFile', readSampleGameScheduleAsStream());

    const response = await axios.post('/schedules/current', form, {baseURL: baseUrl, headers: {...form.getHeaders(), 'Content-Type': 'multipart/form-data'}});

    expect(response.status).toEqual(constants.HTTP_STATUS_CREATED);
    expect(await repository.getAll()).toHaveLength(1);
  });

  test('when getting current schedule and current schedule exists then returns current schedule', async () => {
    const {id} = await repository.create(GameScheduleEntity.fromModel(ModelFactory.createGameSchedule()));

    const response = await axios.get<GameScheduleModel>('/schedules/current', {baseURL: baseUrl});

    expect(response.status).toEqual(constants.HTTP_STATUS_OK);
    expect(response.data.id).toEqual(id);
  });

  afterEach(async () => {
    await app.close();
  });
});
