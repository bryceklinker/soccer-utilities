import { parse } from 'date-fns';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '@soccer-utilities/models';

export function convertStringToDate(value: string): Date {
  return parse(value, DATE_FORMAT, new Date());
}

export function convertStringDateTimeToDate(date: string, time: string): Date {
  return parse(`${date} ${time}`, DATE_TIME_FORMAT, new Date());
}
