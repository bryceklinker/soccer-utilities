import {
  createAsyncActionSet,
  emptyPrepare,
} from '../../state/create-async-action-set';
import { UserTimesheetModel } from '@soccer-utilities/models';

export const TimesheetsActions = {
  loadCurrent: createAsyncActionSet(
    '[Timesheeets] Load Current Timesheet',
    emptyPrepare,
    (timesheet: UserTimesheetModel) => ({ payload: timesheet }),
    emptyPrepare
  ),

  clockIn: createAsyncActionSet(
    '[Timesheets] Clock In',
    emptyPrepare,
    (timesheet: UserTimesheetModel) => ({ payload: timesheet }),
    emptyPrepare
  ),

  clockOut: createAsyncActionSet(
    '[Timesheets] Clock Out',
    emptyPrepare,
    (timesheet: UserTimesheetModel) => ({ payload: timesheet }),
    emptyPrepare
  ),

  pay: createAsyncActionSet(
    '[Timesheets] Pay',
    (timesheet: UserTimesheetModel) => ({ payload: timesheet }),
    (timesheet: UserTimesheetModel) => ({ payload: timesheet }),
    emptyPrepare
  ),
};
