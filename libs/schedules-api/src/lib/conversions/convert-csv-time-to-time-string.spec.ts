import { convertCsvTimeToTimeString } from './convert-csv-time-to-time-string';

describe('convert csv time to time string', () => {
  test('when time is in h:mm:ss a format then returns time in hh:mm a', () => {
    expect(convertCsvTimeToTimeString('9:00:00 AM')).toEqual('09:00 AM');
  });

  test('when time is in h:mm a format then returns time in hh:mm a', () => {
    expect(convertCsvTimeToTimeString('9:00 AM')).toEqual('09:00 AM');
  });

  test('when time is unknown format then throws error', () => {
    expect(() => convertCsvTimeToTimeString('10 AM')).toThrowError();
  })
});
