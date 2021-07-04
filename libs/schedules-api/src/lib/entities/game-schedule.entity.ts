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
    actual.id = source.id;
    actual.games = source.games.map(GameEntity.fromModel);
    actual.lastUpdated = source.lastUpdated;
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

  updateFromModel(model: GameScheduleModel) {
    this.games = model.games.map(GameEntity.fromModel);
    this.lastUpdated = new Date().toISOString();
  }
}

