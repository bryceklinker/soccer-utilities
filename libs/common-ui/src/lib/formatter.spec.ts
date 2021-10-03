import { Formatter } from './formatter';

describe('Formatter', () => {
  describe('number', () => {
    test('when number formatted as number then returns number', () => {
      expect(Formatter.number(43.123)).toEqual('43.12');
    });

    test('when undefined formatted as number then returns "N/A"', () => {
      expect(Formatter.number()).toEqual('N/A');
    });

    test('when null formatted as number then returns "N/A"', () => {
      expect(Formatter.number(null)).toEqual('N/A');
    });
  });

  describe('currency', () => {
    test('when number formatted as currency then returns number as us dollars', () => {
      expect(Formatter.currency(12.34)).toEqual('$12.34');
    });

    test('when undefined formatted as currency then returns "N/A"', () => {
      expect(Formatter.currency()).toEqual('N/A');
    });

    test('when null formatted as currency then returns "N/A"', () => {
      expect(Formatter.currency(null)).toEqual('N/A');
    });
  });

  describe('date', () => {
    test('when date formatted as date then returns date in locale', () => {
      expect(Formatter.date('2021-09-23')).toEqual('9/23/2021');
    });

    test('when date time formatted as date then returns date in locale', () => {
      expect(Formatter.date('2021-08-23T08:34:12.000Z')).toEqual('8/23/2021');
    });

    test('when undefined formatted as date then returns "N/A"', () => {
      expect(Formatter.date()).toEqual('N/A');
    });

    test('when null formatted as date then returns "N/A"', () => {
      expect(Formatter.date(null)).toEqual('N/A');
    });
  });

  describe('time', () => {
    test('when date time formatted as time then returns time in locale', () => {
      expect(Formatter.time('2021-08-23T08:34:12.000Z')).toEqual('8:34:12 AM');
    });

    test('when undefined formatted as time then returns "N/A"', () => {
      expect(Formatter.time()).toEqual('N/A');
    });

    test('when null formatted as date time returns "N/A"', () => {
      expect(Formatter.time(null)).toEqual('N/A');
    });
  });

  describe('datetime', () => {
    test('when date time formatted as date time then returns time in locale', () => {
      expect(Formatter.datetime('2021-08-23T08:34:12.000Z')).toEqual(
        '8/23/2021 8:34:12 AM'
      );
    });

    test('when undefined formatted as date time then returns "N/A"', () => {
      expect(Formatter.datetime()).toEqual('N/A');
    });

    test('when null formatted as date time then returns "N/A"', () => {
      expect(Formatter.datetime(null)).toEqual('N/A');
    });
  });
});
