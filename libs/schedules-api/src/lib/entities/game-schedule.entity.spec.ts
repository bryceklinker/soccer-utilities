import { ModelFactory } from '@soccer-utilities/core/testing';
import { GameScheduleEntity } from './game-schedule.entity';
import * as faker from 'faker';

describe('GameScheduleEntity', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern')
      .setSystemTime(Date.UTC(2021, 8, 23));
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

    const actual = GameScheduleEntity
      .fromModel(expected)
      .toModel();

    expect(actual).toEqual({
      ...expected,
      type: 'game-schedule'
    });
  });

  test('when updated from model then updates self from model', () => {
    const model = ModelFactory.createGameSchedule();

    const entity = GameScheduleEntity.fromModel(ModelFactory.createGameSchedule());
    entity.updateFromModel(model);

    expect(entity.games).toEqual(model.games);
    expect(entity.lastUpdated).toEqual('2021-09-23T00:00:00.000Z');
  });

  test('when created from entity then populates from entity', () => {
    const original = GameScheduleEntity.fromModel(ModelFactory.createGameSchedule());
    original.id = faker.datatype.uuid();

    const actual = GameScheduleEntity.fromEntity(original);

    expect(actual.games).toEqual(original.games);
    expect(actual.id).toEqual(original.id);
    expect(actual.lastUpdated).toEqual(original.lastUpdated);
    expect(actual.toModel).toBeDefined();
    expect(actual.updateFromModel).toBeDefined();
  })
});
