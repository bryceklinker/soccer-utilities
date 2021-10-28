import { EntityState } from '@reduxjs/toolkit';
import { UiUserTimesheetModel } from '@soccer-utilities/models';

export interface TimesheetsState extends EntityState<UiUserTimesheetModel> {
  current: UiUserTimesheetModel | string | null;
}
