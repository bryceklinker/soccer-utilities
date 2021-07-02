import { ModelFactory } from '@soccer-utilities/core/testing';
import { GameScheduleEntity } from './game-schedule.entity';

describe('GameScheduleEntity', () => {
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
});
