import { DateRange } from '@soccer-utilities/core';
import { convertStringToDate } from './convert-string-to-date';
import { isWithinInterval } from 'date-fns';

export function isDateInRange(date: string, range: DateRange): boolean {
  const start = convertStringToDate(range.start);
  const end = convertStringToDate(range.end);
  const actualDate = convertStringToDate(date);
  return isWithinInterval(actualDate, {start, end});
}
