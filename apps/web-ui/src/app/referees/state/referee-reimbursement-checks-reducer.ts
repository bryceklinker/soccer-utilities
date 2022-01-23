import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { RefereeReimbursementCheckModel } from '@soccer-utilities/models';
import { RefereeReimbursementChecksState } from './referee-reimbursement-checks-state';
import { RefereesActions } from './referees-actions';

const adapter = createEntityAdapter<RefereeReimbursementCheckModel>({
  selectId: (model) => model.referee,
});
const initialState: RefereeReimbursementChecksState = {
  ...adapter.getInitialState(),
  hasBeenLoaded: false,
};
export const refereeReimbursementChecksReducer =
  createReducer<RefereeReimbursementChecksState>(initialState, (builder) =>
    builder.addCase(
      RefereesActions.loadReimbursementChecks.success,
      (state, { payload }) => {
        adapter.addMany(state, payload.items);
        state.hasBeenLoaded = true;
        return state;
      }
    )
  );

export const refereeReimbursementChecksSelectors = adapter.getSelectors();
