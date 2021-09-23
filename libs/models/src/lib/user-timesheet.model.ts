import { TimesheetStatus } from './timesheet-status';

export interface UserTimesheetModel {
  id?: string;
  rate: number;
  username: string;
  status: TimesheetStatus;
  amount: number;
  timeIn?: string;
  timeOut?: string;
  hours?: number;
}
