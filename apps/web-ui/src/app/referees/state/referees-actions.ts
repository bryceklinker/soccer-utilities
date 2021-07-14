import { createAsyncActionSet, emptyPrepare } from '../../state/create-async-action-set';
import { DateRange, ListResult} from '@soccer-utilities/core';
import { createAction } from '@reduxjs/toolkit';
import { ClientRefereeCheckModel } from '@soccer-utilities/schedules-ui';

export const RefereesActions = {
  loadChecks: createAsyncActionSet(
    '[Referees] Load Checks',
    (range?: DateRange) => ({payload: range}),
    (checks: ListResult<ClientRefereeCheckModel>) => ({ payload: checks }),
    emptyPrepare
  ),
  checkWritten: createAction('[Referees] Check Written', (check: ClientRefereeCheckModel) => ({ payload: check }))
};
