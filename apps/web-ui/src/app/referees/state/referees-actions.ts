import {
  createAsyncActionSet,
  emptyPrepare,
} from '../../state/create-async-action-set';
import {
  ClientRefereeCheckModel,
  DateRangeModel,
  ListResult,
} from '@soccer-utilities/models';
import { createAction } from '@reduxjs/toolkit';

export const RefereesActions = {
  loadChecks: createAsyncActionSet(
    '[Referees] Load Checks',
    (range?: DateRangeModel) => ({ payload: range }),
    (checks: ListResult<ClientRefereeCheckModel>) => ({ payload: checks }),
    emptyPrepare
  ),
  checkWritten: createAction(
    '[Referees] Check Written',
    (check: ClientRefereeCheckModel) => ({ payload: check })
  ),
};
