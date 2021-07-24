import { ReadStream } from 'fs';
import * as fs from 'fs';
import * as path from 'path';

const SAMPLE_FILES_DIRECTORY = path.resolve(__dirname, 'sample-files');
const SAMPLE_GAME_SCHEDULE_PATH = path.resolve(
  SAMPLE_FILES_DIRECTORY,
  'game-schedule.csv'
);

export function readSampleGameScheduleAsStream(): ReadStream {
  return fs.createReadStream(SAMPLE_GAME_SCHEDULE_PATH);
}

export function readSampleGameAsBuffer(): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(SAMPLE_GAME_SCHEDULE_PATH, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
