import { FunctionComponent, useEffect, useCallback } from 'react';
import { Typography } from '@mui/material';
import { TimesheetCard } from '@soccer-utilities/timesheets-ui';
import { LoadingIndicator } from '@soccer-utilities/common-ui';
import { UserTimesheetModel } from '@soccer-utilities/models';
import { useRootDispatch, useRootSelector } from '../../state/root-hooks';
import { TimesheetsActions } from '../state/timesheets-actions';
import { selectCurrentTimesheet } from '../state/timesheets-selectors';
import { selectIsAdminUser } from '../../auth/state/auth-selectors';

export const CurrentTimesheetPage: FunctionComponent = () => {
  const dispatch = useRootDispatch();
  const currentTimesheet = useRootSelector(selectCurrentTimesheet);
  const isAdmin = useRootSelector(selectIsAdminUser);
  const onClockIn = useCallback(
    () => dispatch(TimesheetsActions.clockIn.request()),
    [dispatch]
  );
  const onClockOut = useCallback(
    () => dispatch(TimesheetsActions.clockOut.request()),
    [dispatch]
  );
  const onPay = useCallback(
    (timesheet: UserTimesheetModel) =>
      dispatch(TimesheetsActions.pay.request(timesheet)),
    [dispatch]
  );

  useEffect(() => {
    dispatch(TimesheetsActions.loadCurrent.request());
  }, [dispatch]);

  if (!currentTimesheet) {
    return (
      <LoadingIndicator show center>
        <Typography variant={'h4'}>Loading Current Timesheet</Typography>
      </LoadingIndicator>
    );
  }

  return (
    <TimesheetCard
      timesheet={currentTimesheet}
      disablePay={!isAdmin}
      onClockIn={onClockIn}
      onClockOut={onClockOut}
      onPay={onPay}
    />
  );
};
