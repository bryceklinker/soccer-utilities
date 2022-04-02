import { ReadStream } from 'fs';
import * as fs from 'fs';
import * as path from 'path';

const SAMPLE_FILES_DIRECTORY = path.resolve(__dirname, 'sample-files');

export const SAMPLE_FILES = {
  GOOD_GAME_SCHEDULE: path.resolve(
    SAMPLE_FILES_DIRECTORY,
    'game-schedule-sample.csv'
  ),
  GAME_SCHEDULE_WITH_BAD_ROWS: path.resolve(
    SAMPLE_FILES_DIRECTORY,
    'game-schedule-sample-with-bad-rows.csv'
  ),
};

export function readSampleGameScheduleAsStream(
  filePath: string = SAMPLE_FILES.GOOD_GAME_SCHEDULE
): ReadStream {
  return fs.createReadStream(filePath);
}

export function readSampleGameAsBuffer(
  filePath: string = SAMPLE_FILES.GOOD_GAME_SCHEDULE
): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
