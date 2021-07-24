import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useRootDispatch, useRootSelector } from '../../state/root-hooks';
import {
  selectAllRefereeChecks,
  selectHaveRefereeChecksBeenLoaded,
} from '../state/referee-checks-selectors';
import { RefereesActions } from '../state/referees-actions';
import {
  DateRangeSelector,
  RefereeChecks,
} from '@soccer-utilities/schedules-ui';
import { selectIsLoading } from '../../loading/state/loading-selectors';
import {
  FormControlLabel,
  Switch,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  ColumnFlexBox,
  LoadingIndicator,
  RowFlexBox,
} from '@soccer-utilities/common-ui';
import {
  ClientRefereeCheckModel,
  DateRangeModel,
} from '@soccer-utilities/models';

export const RefereeChecksPage: FunctionComponent = () => {
  const dispatch = useRootDispatch();
  const hasPreviouslyLoadedChecks = useRootSelector(
    selectHaveRefereeChecksBeenLoaded
  );
  const isLoadingChecks = useRootSelector(
    selectIsLoading(RefereesActions.loadChecks.request)
  );
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const handleDateRangeChanged = useCallback(
    (range?: DateRangeModel) => {
      const start = range ? range.start : null;
      const end = range ? range.end : null;
      setStartDate(start);
      setEndDate(end);
      dispatch(RefereesActions.loadChecks.request(range));
    },
    [dispatch]
  );
  const checks = useRootSelector(selectAllRefereeChecks({ showAll }));

  const handleCheckCopied = useCallback(
    (check: ClientRefereeCheckModel) => {
      dispatch(RefereesActions.checkWritten(check));
    },
    [dispatch]
  );

  const handleShowAllToggled = useCallback(() => {
    setShowAll(!showAll);
  }, [showAll, setShowAll]);

  useEffect(() => {
    if (isLoadingChecks || hasPreviouslyLoadedChecks) {
      return;
    }

    dispatch(RefereesActions.loadChecks.request());
  }, [isLoadingChecks, hasPreviouslyLoadedChecks, dispatch]);

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
        <FormControlLabel
          label={'Show All'}
          control={
            <Switch
              checked={showAll}
              onChange={handleShowAllToggled}
              inputProps={{ 'aria-label': 'show all checks toggle' }}
            />
          }
        />
        <RowFlexBox />
        <DateRangeSelector
          onSearch={handleDateRangeChanged}
          start={startDate}
          end={endDate}
        />
      </Toolbar>
      <RefereeChecks checks={checks} onCopyCheck={handleCheckCopied} />
    </ColumnFlexBox>
  );
};
