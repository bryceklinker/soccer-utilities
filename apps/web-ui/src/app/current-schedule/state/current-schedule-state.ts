import { GameModel } from '@soccer-utilities/models';

export interface CurrentScheduleState {
  games: Array<GameModel>;
  lastUpdated: string | null;
}
