import { Entity } from '@soccer-utilities/data-access';
import { TimesheetStatus, UserTimesheetModel } from '@soccer-utilities/models';
import { differenceInMinutes, parseISO } from 'date-fns';

const MINUTES_IN_HOUR = 60;

export class UserTimesheetEntity implements UserTimesheetModel, Entity {
  static type = 'user-timesheet';
  readonly type: string = UserTimesheetEntity.type;

  constructor(
    public readonly username: string,
    public readonly rate: number,
    public id?: string,
    public timeIn?: string,
    public timeOut?: string,
    public hours?: number,
    public status: TimesheetStatus = TimesheetStatus.Unknown,
    public amount: number = 0
  ) {}

  static fromModel(model: UserTimesheetModel): UserTimesheetEntity {
    return new UserTimesheetEntity(
      model.username,
      model.rate,
      model.id,
      model.timeIn,
      model.timeOut,
      model.hours,
      model.status,
      model.amount
    );
  }

  static fromEntity(entity: UserTimesheetEntity): UserTimesheetEntity {
    return UserTimesheetEntity.fromModel(entity);
  }

  toModel(): UserTimesheetModel {
    return {
      ...this,
    };
  }

  clockIn() {
    this.timeIn = new Date().toISOString();
    this.status = TimesheetStatus.Incomplete;
  }

  clockOut() {
    if (this.status !== TimesheetStatus.Incomplete) {
      throw new Error(
        `Attempt to clock out ${this.username} without clocking in.`
      );
    }

    this.timeOut = new Date().toISOString();
    const minutesWorked = differenceInMinutes(
      parseISO(this.timeOut),
      parseISO(this.timeIn)
    );
    const hoursWorked = minutesWorked / MINUTES_IN_HOUR;
    this.hours = Math.round((hoursWorked + Number.EPSILON) * 100) / 100;
    this.status = TimesheetStatus.Complete;
  }

  pay() {
    if (this.status !== TimesheetStatus.Complete) {
      throw new Error(
        `Attempt to pay timesheet ${this.id} without clocking out.`
      );
    }

    this.amount = this.hours * this.rate;
    this.status = TimesheetStatus.Paid;
  }
}
