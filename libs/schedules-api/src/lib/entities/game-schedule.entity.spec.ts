import { ModelFactory } from '@soccer-utilities/testing-support';
import { GameScheduleEntity } from './game-schedule.entity';
import * as faker from 'faker';
import { DEFAULT_REFEREE_PAY_SCALES } from '@soccer-utilities/core';
import { DateRangeModel, RefereeType } from '@soccer-utilities/models';

describe('GameScheduleEntity', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(Date.UTC(2021, 8, 23));
  });

  test('when created from model then entity is populated from model', () => {
    const model = ModelFactory.createGameSchedule();

    const entity = GameScheduleEntity.fromModel(model);

    expect(entity.id).toBeUndefined();
    expect(entity.type).toEqual('game-schedule');
    expect(entity.games).toEqual(model.games);
    expect(entity.lastUpdated).toEqual(model.lastUpdated);
  });

  test('when converted to model then populates model from entity', () => {
    const expected = ModelFactory.createGameSchedule();

    const actual = GameScheduleEntity.fromModel(expected).toModel();

    expect(actual).toEqual({
      ...expected,
      type: 'game-schedule',
    });
  });

  test('when updated from model then updates self from model', () => {
    const model = ModelFactory.createGameSchedule();

    const entity = GameScheduleEntity.fromModel(
      ModelFactory.createGameSchedule()
    );
    entity.updateFromModel(model);

    expect(entity.games).toEqual(model.games);
    expect(entity.lastUpdated).toEqual('2021-09-23T00:00:00.000Z');
  });

  test('when created from entity then populates from entity', () => {
    const original = GameScheduleEntity.fromModel(
      ModelFactory.createGameSchedule()
    );
    original.id = faker.datatype.uuid();

    const actual = GameScheduleEntity.fromEntity(original);

    expect(actual.games).toEqual(original.games);
    expect(actual.id).toEqual(original.id);
    expect(actual.lastUpdated).toEqual(original.lastUpdated);
    expect(actual.toModel).toBeDefined();
    expect(actual.updateFromModel).toBeDefined();
  });

  test('when schedule has one game with one referee then returns a single referee check', () => {
    const schedule = GameScheduleEntity.fromModel(
      ModelFactory.createGameSchedule({
        games: [
          ModelFactory.createGame({
            ageGroup: ModelFactory.createAgeGroup({ age: 8 }),
            referees: [
              ModelFactory.createReferee({
                type: RefereeType.Center,
                name: 'Will',
              }),
            ],
          }),
        ],
      })
    );

    const refereePayScale = ModelFactory.createPayScale({
      refereeType: RefereeType.Center,
      amount: 20,
      ageGroup: ModelFactory.createAgeGroup({ age: 8 }),
    });
    const checks = schedule.getRefereeChecks([refereePayScale]);

    expect(checks).toHaveLength(1);
  });

  test('when getting referee checks with date range then returns referee checks for games within date range', () => {
    const schedule = GameScheduleEntity.fromModel(
      ModelFactory.createGameSchedule({
        games: [
          ModelFactory.createGame({
            date: '2020-06-01',
            referees: [ModelFactory.createReferee()],
          }),
          ModelFactory.createGame({
            date: '2020-06-02',
            referees: [ModelFactory.createReferee()],
          }),
          ModelFactory.createGame({
            date: '2020-06-03',
            referees: [ModelFactory.createReferee()],
          }),
        ],
      })
    );

    const range: DateRangeModel = { start: '2020-06-01', end: '2020-06-02' };
    const checks = schedule.getRefereeChecks(DEFAULT_REFEREE_PAY_SCALES, range);

    expect(checks).toHaveLength(2);
  });

  test('when getting referee reimbursement checks then returns all reimbursement checks', () => {
    const schedule = GameScheduleEntity.fromModel(
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
          ModelFactory.createGame({
            ageGroup: ModelFactory.createAgeGroup({ age: 8 }),
            referees: [
              ModelFactory.createReferee({
                name: 'Jon',
                type: RefereeType.Center,
              }),
            ],
          }),
        ],
      })
    );

    const checks = schedule.getRefereeReimbursementChecks();

    expect(checks).toHaveLength(2);
  });
});
