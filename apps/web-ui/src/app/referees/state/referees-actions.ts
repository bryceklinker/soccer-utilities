import { createAsyncActionSet, emptyPrepare } from '../../state/create-async-action-set';
import { DateRange, List, RefereeCheckModel } from '@soccer-utilities/core';
import { createAction } from '@reduxjs/toolkit';
import { ClientRefereeCheckModel } from '@soccer-utilities/schedules-ui';

export const RefereesActions = {
  loadChecks: createAsyncActionSet(
    '[Referees] Load Checks',
    (range?: DateRange) => ({payload: range}),
    (checks: List<RefereeCheckModel>) => ({ payload: checks }),
    emptyPrepare
  ),
  checkWritten: createAction('[Referees] Check Written', (check: ClientRefereeCheckModel) => ({ payload: check }))
};
