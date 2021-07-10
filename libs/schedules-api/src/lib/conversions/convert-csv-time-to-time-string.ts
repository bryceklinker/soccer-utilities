import { format, parse } from 'date-fns';
import { TIME_FORMAT } from '@soccer-utilities/core';

export function convertCsvTimeToTimeString(csvTime: string): string {
  const time = parse(csvTime, 'h:mm:ss a', new Date());
  return format(time, TIME_FORMAT);
}
