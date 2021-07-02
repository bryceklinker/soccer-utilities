import { ReadStream } from 'fs';
import { GameScheduleModel } from '@soccer-utilities/core';
import * as csv from 'csv-parser';
import { convertCsvRowToGame } from './convert-csv-row-to-game';

export function convertStreamToGameSchedule(stream: ReadStream): Promise<GameScheduleModel> {
  return new Promise((resolve, reject) => {
    const games = [];
    stream.pipe(csv())
      .on('data', data => games.push(convertCsvRowToGame(data)))
      .on('end', () => {
        resolve({
          games,
          lastUpdated: new Date().toISOString()
        });
      })
  });
}
