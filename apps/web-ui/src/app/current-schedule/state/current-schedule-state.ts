import { GameModel } from '@soccer-utilities/core';

export interface CurrentScheduleState {
  games: Array<GameModel>;
  lastUpdated: string | null;
}
