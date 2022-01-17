import { GetCurrentScheduleQueryHandler } from './get-current-schedule-query-handler';
import { GetRefereeChecksQueryHandler } from './get-referee-checks-query-handler';
import { GetRefereeReimbursementChecksQueryHandler } from './get-referee-reimbursement-checks-query-handler';

export * from './get-current-schedule-query-handler';
export * from './get-referee-checks-query-handler';
export * from './get-referee-reimbursement-checks-query-handler';

export const QUERY_HANDLERS = [
  GetCurrentScheduleQueryHandler,
  GetRefereeChecksQueryHandler,
  GetRefereeReimbursementChecksQueryHandler,
];
