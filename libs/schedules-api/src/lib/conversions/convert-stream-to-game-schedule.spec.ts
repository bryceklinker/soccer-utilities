import {
  readSampleGameScheduleAsStream,
  SAMPLE_FILES,
} from '@soccer-utilities/testing-support';
import { convertStreamToGameSchedule } from './convert-stream-to-game-schedule';

const CURRENT_TIME = Date.UTC(2021, 6, 3, 14, 12, 56, 123);

describe('convertStreamToGameSchedule', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(CURRENT_TIME);
  });

  test('when stream is csv then returns games from csv', async () => {
    const stream = readSampleGameScheduleAsStream();

    const { schedule } = await convertStreamToGameSchedule(stream);

    expect(schedule.games).toHaveLength(5);
  });

  test('when stream is csv then returns last updated as now', async () => {
    const { schedule } = await convertStreamToGameSchedule(
      readSampleGameScheduleAsStream()
    );

    expect(schedule.lastUpdated).toEqual('2021-07-03T14:12:56.123Z');
  });

  test('when stream has invalid row in csv then returns failed row', async () => {
    const stream = readSampleGameScheduleAsStream(
      SAMPLE_FILES.GAME_SCHEDULE_WITH_BAD_ROWS
    );

    const { schedule, failedRows } = await convertStreamToGameSchedule(stream);

    expect(schedule.games).toHaveLength(3);
    expect(failedRows).toHaveLength(2);
  });
});
