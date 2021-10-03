import { ModelFactory } from '@soccer-utilities/testing-support';
import { UserTimesheetEntity } from './user-timesheet.entity';
import { addMinutes, parseISO } from 'date-fns';
import { TimesheetStatus } from '@soccer-utilities/models';

const CURRENT_TIME = '2021-09-23T14:45:23.123Z';

describe('UserTimesheetEntity', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(parseISO(CURRENT_TIME));
  });

  test('when created then should have default values', () => {
    const entity = new UserTimesheetEntity('bill');

    expect(entity.username).toEqual('bill');
    expect(entity.rate).toEqual(12);
    expect(entity.status).toEqual(TimesheetStatus.New);
    expect(entity.amount).toEqual(0);
  });

  test('when created from model then entity is populated from model', () => {
    const model = ModelFactory.createUserTimesheetModel({
      timeIn: '2021-09-23T12:00:00.000Z',
      timeOut: '2021-09-23T15:35:00.000Z',
      hours: 4,
      rate: 14,
      status: TimesheetStatus.Paid,
      amount: 48,
    });

    const entity = UserTimesheetEntity.fromModel(model);

    expect(entity.id).toEqual(model.id);
    expect(entity.username).toEqual(model.username);
    expect(entity.rate).toEqual(14);
    expect(entity.hours).toEqual(4);
    expect(entity.amount).toEqual(48);
    expect(entity.status).toEqual(TimesheetStatus.Paid);
    expect(entity.timeIn).toEqual('2021-09-23T12:00:00.000Z');
    expect(entity.timeOut).toEqual('2021-09-23T15:35:00.000Z');
  });

  test('when created from entity then returns entity populated from entity', () => {
    const expected = ModelFactory.createUserTimesheetModel();
    const actual = UserTimesheetEntity.fromEntity(
      expected as UserTimesheetEntity
    );

    expect(actual.id).toEqual(expected.id);
    expect(actual.timeOut).toEqual(expected.timeOut);
    expect(actual.timeIn).toEqual(expected.timeIn);
    expect(actual.username).toEqual(expected.username);
    expect(actual.hours).toEqual(expected.hours);
    expect(actual.rate).toEqual(expected.rate);
    expect(actual.status).toEqual(expected.status);
    expect(actual.amount).toEqual(expected.amount);
    expect(actual.toModel).toBeDefined();
    expect(actual.clockIn).toBeDefined();
    expect(actual.clockOut).toBeDefined();
  });

  test('when converted to model then returns model', () => {
    const entity = UserTimesheetEntity.fromModel(
      ModelFactory.createUserTimesheetModel()
    );

    const model = entity.toModel();

    expect(model.id).toEqual(entity.id);
    expect(model.timeOut).toEqual(entity.timeOut);
    expect(model.timeIn).toEqual(entity.timeIn);
    expect(model.username).toEqual(entity.username);
  });

  test('when clocked in then timesheet is clocked in', () => {
    const entity = new UserTimesheetEntity('billy', 8);

    entity.clockIn();

    expect(entity.timeIn).toEqual(CURRENT_TIME);
    expect(entity.status).toEqual(TimesheetStatus.Open);
  });

  test('when attempting to clock out without clocking in then throws error', () => {
    const entity = new UserTimesheetEntity('bob', 10);

    expect(() => entity.clockOut()).toThrowError();
  });

  test('when attempting to clock out after already clocking out then throws error', () => {
    const entity = new UserTimesheetEntity('bob', 10);

    entity.clockIn();
    entity.clockOut();

    expect(() => entity.clockOut()).toThrowError();
  });

  test('when attempting to clock out after paying then throws error', () => {
    const entity = new UserTimesheetEntity('bob', 10);

    entity.clockIn();
    entity.clockOut();
    entity.pay();

    expect(() => entity.clockOut()).toThrowError();
  });

  test('when clocked out then timesheet is completed', () => {
    const entity = new UserTimesheetEntity('bob', 10);

    entity.clockIn();
    const clockOutTime = addMinutes(parseISO(CURRENT_TIME), 73);
    jest.setSystemTime(clockOutTime);
    entity.clockOut();

    expect(entity.timeOut).toEqual(clockOutTime.toISOString());
    expect(entity.hours).toEqual(1.22);
    expect(entity.status).toEqual(TimesheetStatus.Complete);
  });

  test('when timesheet is paid then timesheet is paid', () => {
    const entity = new UserTimesheetEntity('bill', 12);

    entity.clockIn();
    jest.setSystemTime(addMinutes(parseISO(CURRENT_TIME), 73));
    entity.clockOut();
    entity.pay();

    expect(entity.amount).toEqual(14.64);
    expect(entity.status).toEqual(TimesheetStatus.Paid);
  });

  test('when attempting to pay incomplete timesheet then throws error', () => {
    const entity = new UserTimesheetEntity('bob', 23);

    expect(() => entity.pay()).toThrowError();
  });

  test('when attempting to pay an already paid timesheet then throws error', () => {
    const entity = new UserTimesheetEntity('jack', 12);

    entity.clockIn();
    entity.clockOut();
    entity.pay();

    expect(() => entity.pay()).toThrowError();
  });
});
