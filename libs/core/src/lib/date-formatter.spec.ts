import { parse } from 'date-fns';
import { DATE_FORMAT } from '@soccer-utilities/models';
import { DateFormatter } from './date-formatter';

describe('DateFormatter', () => {
  test('when invalid date is formatted then returns null', () => {
    const date = parse('2021', DATE_FORMAT, new Date());

    expect(DateFormatter.safeFormat(date)).toEqual(null);
  });

  test('when date formatted then returns date in iso format', () => {
    const date = parse('2021-09-23', DATE_FORMAT, new Date());

    expect(DateFormatter.safeFormat(date)).toEqual('2021-09-23');
  });

  test('when null formatted then returns null', () => {
    expect(DateFormatter.safeFormat(null)).toEqual(null);
  });
});
