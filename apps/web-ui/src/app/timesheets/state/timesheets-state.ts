import { EntityState } from '@reduxjs/toolkit';
import { UserTimesheetModel } from '@soccer-utilities/models';

export interface TimesheetsState extends EntityState<UserTimesheetModel> {
  current: UserTimesheetModel | string | null;
}
