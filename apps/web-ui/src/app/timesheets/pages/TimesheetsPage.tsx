import { FunctionComponent, useCallback, useEffect } from 'react';
import { useRootDispatch, useRootSelector } from '../../state/root-hooks';
import { TimesheetsActions } from '../state/timesheets-actions';
import { selectIsLoading } from '../../loading/state/loading-selectors';
import { LoadingIndicator } from '@soccer-utilities/common-ui';
import { Typography } from '@mui/material';
import { Timesheets } from '@soccer-utilities/timesheets-ui';
import { selectAllTimesheets } from '../state/timesheets-selectors';
import { UserTimesheetModel } from '@soccer-utilities/models';

export const TimesheetsPage: FunctionComponent = () => {
  const dispatch = useRootDispatch();
  const isLoadingTimesheets = useRootSelector(
    selectIsLoading(TimesheetsActions.loadAll.request)
  );
  const timesheets = useRootSelector(selectAllTimesheets);

  const handleDelete = useCallback(
    (timesheet: UserTimesheetModel) => {
      dispatch(TimesheetsActions.delete.request(timesheet));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(TimesheetsActions.loadAll.request());
  }, [dispatch]);

  if (isLoadingTimesheets) {
    return (
      <LoadingIndicator>
        <Typography variant={'h4'}>Loading Timesheets</Typography>
      </LoadingIndicator>
    );
  }

  return <Timesheets timesheets={timesheets} onDelete={handleDelete} />;
};
