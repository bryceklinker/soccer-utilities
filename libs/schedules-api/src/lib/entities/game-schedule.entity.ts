import { GameScheduleModel } from '@soccer-utilities/core';
import { GameEntity } from './game.entity';

export class GameScheduleEntity implements GameScheduleModel {
  static type = 'game-schedule';
  id?: string;
  readonly type: string = GameScheduleEntity.type;

  games: Array<GameEntity>;
  lastUpdated: string;

  static fromEntity(source: GameScheduleEntity) {
    const actual = new GameScheduleEntity();
    Object.assign(actual, source);
    return actual;
  }

  static fromModel(model: GameScheduleModel): GameScheduleEntity {
    const entity = new GameScheduleEntity();
    entity.lastUpdated = model.lastUpdated;
    entity.games = model.games.map(GameEntity.fromModel);
    return entity;
  }

  toModel(): GameScheduleModel {
    return {
      ...this,
      games: this.games.map(g => g.toModel())
    };
  }
}

