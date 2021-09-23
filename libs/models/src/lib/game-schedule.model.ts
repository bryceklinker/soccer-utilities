import { GameModel } from './game.model';

export interface GameScheduleModel {
  id?: string;
  games: Array<GameModel>;
  lastUpdated: string;
}
