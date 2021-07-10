import { format, parse } from 'date-fns';
import { DATE_FORMAT } from '@soccer-utilities/core';

export function convertCsvDateToDateString(csvDate: string): string {
  const date = parse(csvDate, 'M/d/yyyy', new Date());
  return format(date, DATE_FORMAT);
}
