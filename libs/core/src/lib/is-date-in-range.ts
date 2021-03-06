import { convertStringToDate } from './convert-string-to-date';
import { isWithinInterval } from 'date-fns';
import { DateRangeModel } from '@soccer-utilities/models';

export function isDateInRange(date: string, range: DateRangeModel): boolean {
  const start = convertStringToDate(range.start);
  const end = convertStringToDate(range.end);
  const actualDate = convertStringToDate(date);
  return isWithinInterval(actualDate, { start, end });
}
