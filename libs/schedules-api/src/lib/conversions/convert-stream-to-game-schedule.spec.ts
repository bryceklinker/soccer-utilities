import { readSampleGameSchedule } from '@soccer-utilities/testing-support';
import { convertStreamToGameSchedule } from './convert-stream-to-game-schedule';

const CURRENT_TIME = Date.UTC(2021, 6, 3, 14, 12, 56, 123);

describe('convertStreamToGameSchedule', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern')
      .setSystemTime(CURRENT_TIME);
  });

  test('when stream is csv then returns games from csv', async () => {
    const stream = readSampleGameSchedule();

    const model = await convertStreamToGameSchedule(stream);

    expect(model.games).toHaveLength(5);
  });

  test('when stream is csv then returns last updated as now', async () => {
    const model = await convertStreamToGameSchedule(readSampleGameSchedule());

    expect(model.lastUpdated).toEqual('2021-07-03T14:12:56.123Z');
  });
});
