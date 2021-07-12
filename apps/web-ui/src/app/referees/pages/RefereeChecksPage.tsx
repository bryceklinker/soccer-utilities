import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useRootDispatch, useRootSelector } from '../../state/root-hooks';
import { selectAllRefereeChecks, selectHaveRefereeChecksBeenLoaded } from '../state/referee-checks-selectors';
import { RefereesActions } from '../state/referees-actions';
import { ClientRefereeCheckModel, DateRangeSelector, RefereeChecks } from '@soccer-utilities/schedules-ui';
import { selectIsLoading } from '../../loading/state/loading-selectors';
import { Toolbar, Typography } from '@material-ui/core';
import { ColumnFlexBox, LoadingIndicator } from '@soccer-utilities/common-ui';
import { DateRange } from '@soccer-utilities/core';

export const RefereeChecksPage: FunctionComponent = () => {
  const dispatch = useRootDispatch();
  const checks = useRootSelector(selectAllRefereeChecks);
  const hasPreviouslyLoadedChecks = useRootSelector(selectHaveRefereeChecksBeenLoaded);
  const isLoadingChecks = useRootSelector(selectIsLoading(RefereesActions.loadChecks.request));
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const handleDateRangeChanged = useCallback((range: DateRange) => {
    setStartDate(range.start);
    setEndDate(range.end);
    dispatch(RefereesActions.loadChecks.request(range));
  }, [dispatch]);

  const handleCheckCopied = useCallback((check: ClientRefereeCheckModel) => {
    dispatch(RefereesActions.checkWritten(check));
  }, [dispatch])

  useEffect(() => {
    if (isLoadingChecks || hasPreviouslyLoadedChecks) {
      return;
    }

    dispatch(RefereesActions.loadChecks.request());
  }, [isLoadingChecks, hasPreviouslyLoadedChecks]);

  if (isLoadingChecks) {
    return (
      <LoadingIndicator show center>
        <Typography variant={'h4'}>Loading Referee Checks</Typography>
      </LoadingIndicator>
    );
  }

  return (
    <ColumnFlexBox>
      <Toolbar>
        <DateRangeSelector onSearch={handleDateRangeChanged} start={startDate} end={endDate} />
      </Toolbar>
      <RefereeChecks checks={checks} onCopyCheck={handleCheckCopied} />
    </ColumnFlexBox>
  );
};
