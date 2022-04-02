import { GameModel, GameScheduleModel } from '@soccer-utilities/models';
import * as csv from 'csv-parser';
import { convertCsvRowToGame, CsvRow } from './convert-csv-row-to-game';
import { Readable } from 'stream';

export type FailedRow = {
  row: CsvRow;
  error: any;
};

export type ConvertStreamToGameScheduleResult = {
  schedule: GameScheduleModel;
  failedRows: Array<FailedRow>;
};

export function convertStreamToGameSchedule(
  readable: Readable
): Promise<ConvertStreamToGameScheduleResult> {
  return new Promise((resolve) => {
    const games: Array<GameModel> = [];
    const failedRows: Array<FailedRow> = [];
    readable
      .pipe(csv())
      .on('data', (row) => {
        try {
          const game = convertCsvRowToGame(row);
          if (game) {
            games.push(game);
          }
        } catch (error) {
          failedRows.push({ row, error });
        }
      })
      .on('end', () => {
        resolve({
          schedule: {
            games,
            lastUpdated: new Date().toISOString(),
          },
          failedRows,
        });
      });
  });
}
