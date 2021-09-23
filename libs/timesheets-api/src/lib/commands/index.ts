import { ClockInCommandHandler } from './clock-in-command-handler';
import { ClockOutCommandHandler } from './clock-out-command-handler';
import { PayTimesheetCommandHandler } from './pay-timesheet-command-handler';

export { ClockInCommand } from './clock-in-command-handler';
export { ClockOutCommand } from './clock-out-command-handler';
export { PayTimesheetCommand } from './pay-timesheet-command-handler';

export const TIMESHEETS_COMMANDS = [
  ClockInCommandHandler,
  ClockOutCommandHandler,
  PayTimesheetCommandHandler,
];
