import { format, parse } from 'date-fns';
import { TIME_FORMAT } from '@soccer-utilities/models';

export function convertCsvTimeToTimeString(csvTime: string): string {
  const time = parseTime(csvTime);
  if (time === null) {
    throw new Error(`Unrecognized time format ${csvTime}`);
  }
  return format(time, TIME_FORMAT);
}

function parseTime(time: string): Date | null {
  const parsedHoursMinutesSecondsTime = parse(time, 'h:mm:ss a', new Date());
  if (isValidDate(parsedHoursMinutesSecondsTime)) {
    return parsedHoursMinutesSecondsTime;
  }

  const parsedHoursMinutesTime = parse(time, 'h:mm a', new Date());
  if (isValidDate(parsedHoursMinutesTime)) {
    return parsedHoursMinutesTime;
  }

  return null;
}

function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime());
}
