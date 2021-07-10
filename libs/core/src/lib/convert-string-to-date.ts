import { parse } from 'date-fns';

export const DATE_FORMAT = 'yyyy-MM-dd';
export const TIME_FORMAT = 'hh:mm a';
export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;
export function convertStringToDate(value: string): Date {
  return parse(value, DATE_FORMAT, new Date());
}

export function convertStringDateTimeToDate(date: string, time: string): Date {
  return parse(`${date} ${time}`, DATE_TIME_FORMAT, new Date());
}
