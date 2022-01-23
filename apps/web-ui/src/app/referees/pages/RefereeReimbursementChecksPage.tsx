import { useEffect } from 'react';
import { useRootDispatch, useRootSelector } from '../../state/root-hooks';
import { RefereesActions } from '../state/referees-actions';
import { ColumnFlexBox, LoadingIndicator } from '@soccer-utilities/common-ui';
import { RefereeReimbursementChecks } from '@soccer-utilities/schedules-ui';
import {
  selectAllRefereeReimbursementChecks,
  selectHaveRefereeReimbursementChecksBeenLoaded,
} from '../state/referee-reimbursement-checks-selectors';
import { selectIsLoading } from '../../loading/state/loading-selectors';
import { Typography } from '@mui/material';

export const RefereeReimbursementChecksPage = () => {
  const dispatch = useRootDispatch();
  const checks = useRootSelector(selectAllRefereeReimbursementChecks);
  const hasAlreadyLoaded = useRootSelector(
    selectHaveRefereeReimbursementChecksBeenLoaded
  );
  const isLoading = useRootSelector(
    selectIsLoading(RefereesActions.loadReimbursementChecks.request)
  );

  useEffect(() => {
    if (isLoading || hasAlreadyLoaded) {
      return;
    }

    dispatch(RefereesActions.loadReimbursementChecks.request());
  }, [dispatch, isLoading, hasAlreadyLoaded]);

  if (isLoading) {
    return (
      <LoadingIndicator show center>
        <Typography variant={'h4'}>
          Loading Referee Reimbursement Checks
        </Typography>
      </LoadingIndicator>
    );
  }

  return (
    <ColumnFlexBox>
      <RefereeReimbursementChecks checks={checks} />
    </ColumnFlexBox>
  );
};
