export enum TimesheetStatus {
  Unknown = 'Unknown',
  Incomplete = 'Incomplete',
  Complete = 'Complete',
  Paid = 'Paid',
}

export const TimesheetStatuses = Object.values(TimesheetStatus);
