import { GetTimesheetsQueryHandler } from './get-timesheets-query-handler';
import { GetCurrentTimesheetQueryHandler } from './get-current-timesheet-query-handler';

export { GetTimesheetsQuery } from './get-timesheets-query-handler';
export { GetCurrentTimesheetQuery } from './get-current-timesheet-query-handler';

export const TIMESHEET_QUERY_HANDLERS = [
  GetTimesheetsQueryHandler,
  GetCurrentTimesheetQueryHandler,
];
