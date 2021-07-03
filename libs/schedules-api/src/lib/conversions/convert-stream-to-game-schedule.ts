import { GameScheduleModel } from '@soccer-utilities/core';
import * as csv from 'csv-parser';
import { convertCsvRowToGame } from './convert-csv-row-to-game';
import { Readable } from 'stream';

export function convertStreamToGameSchedule(readable: Readable): Promise<GameScheduleModel> {
  return new Promise((resolve, reject) => {
    const games = [];
    readable.pipe(csv())
      .on('data', data => {
        const game = convertCsvRowToGame(data);
        if (game) {
          games.push(game);
        }
      })
      .on('end', () => {
        resolve({
          games,
          lastUpdated: new Date().toISOString()
        });
      })
  });
}
