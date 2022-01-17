import { GameModel } from './game.model';

export interface RefereeReimbursementCheckModel {
  referee: string;
  amount: number;
  games: Array<GameModel>;
}
