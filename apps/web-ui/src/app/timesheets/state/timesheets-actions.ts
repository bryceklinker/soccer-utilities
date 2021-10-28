import {
  createAsyncActionSet,
  emptyPrepare,
} from '../../state/create-async-action-set';
import { ListResult, UserTimesheetModel } from '@soccer-utilities/models';

export const TimesheetsActions = {
  loadAll: createAsyncActionSet(
    '[Timesheets] Load All Timesheets',
    emptyPrepare,
    (result: ListResult<UserTimesheetModel>) => ({ payload: result.items }),
    emptyPrepare
  ),

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

  delete: createAsyncActionSet(
    '[Timesheets] Delete',
    (timesheet: UserTimesheetModel) => ({ payload: timesheet }),
    (timesheet: UserTimesheetModel) => ({ payload: timesheet }),
    (timesheet: UserTimesheetModel) => ({ payload: timesheet })
  ),
};
