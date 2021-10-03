import { FunctionComponent, useEffect, useCallback } from 'react';
import { Typography } from '@material-ui/core';
import { TimesheetCard } from '@soccer-utilities/timesheets-ui';
import { LoadingIndicator } from '@soccer-utilities/common-ui';
import { useRootDispatch, useRootSelector } from '../../state/root-hooks';
import { TimesheetsActions } from '../state/timesheets-actions';
import { selectCurrentTimesheet } from '../state/timesheets-selectors';
import { UserTimesheetModel } from '@soccer-utilities/models';

export const CurrentTimesheetPage: FunctionComponent = () => {
  const dispatch = useRootDispatch();
  const currentTimesheet = useRootSelector(selectCurrentTimesheet);
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
      onClockIn={onClockIn}
      onClockOut={onClockOut}
      onPay={onPay}
    />
  );
};
