import { ReadStream } from 'fs';
import * as fs from 'fs';
import * as path from 'path';

const SAMPLE_FILES_DIRECTORY = path.resolve(__dirname, 'sample-files');
const SAMPLE_GAME_SCHEDULE_PATH = path.resolve(SAMPLE_FILES_DIRECTORY, 'game-schedule.csv');

export function readSampleGameSchedule(): ReadStream {
  return fs.createReadStream(SAMPLE_GAME_SCHEDULE_PATH);
}
