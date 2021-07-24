import { GetCurrentScheduleQueryHandler } from './get-current-schedule-query-handler';
import { GetRefereeChecksQueryHandler } from './get-referee-checks-query-handler';

export * from './get-current-schedule-query-handler';
export * from './get-referee-checks-query-handler';

export const QUERY_HANDLERS = [
  GetCurrentScheduleQueryHandler,
  GetRefereeChecksQueryHandler,
];
