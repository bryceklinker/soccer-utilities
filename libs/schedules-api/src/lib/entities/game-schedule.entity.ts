import { GameScheduleModel } from '@soccer-utilities/core';
import { GameEntity } from './game.entity';

export class GameScheduleEntity implements GameScheduleModel {
  id?: string;
  readonly type: string = 'game-schedule';

  games: Array<GameEntity>;
  lastUpdated: string;

  static fromModel(model: GameScheduleModel): GameScheduleEntity {
    const entity = new GameScheduleEntity();
    entity.lastUpdated = model.lastUpdated;
    entity.games = model.games.map(GameEntity.fromModel);
    return entity;
  }
}

