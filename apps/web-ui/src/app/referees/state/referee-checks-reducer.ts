import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { RefereeChecksState } from './referee-checks-state';
import { RefereesActions } from './referees-actions';
import { ClientRefereeCheckModel } from '@soccer-utilities/schedules-ui';

const adapter = createEntityAdapter<ClientRefereeCheckModel>();
const initialState: RefereeChecksState = {
  ...adapter.getInitialState(),
  hasBeenLoaded: false
}
export const refereeChecksReducer = createReducer<RefereeChecksState>(initialState, builder =>
  builder
    .addCase(RefereesActions.loadChecks.success, (state, { payload }) => {
      adapter.removeAll(state);
      adapter.addMany(state, payload.items);
      state.hasBeenLoaded = true;
      return state;
    })
    .addCase(RefereesActions.loadChecks.failed, (state) => ({...state, hasBeenLoaded: true}))
    .addCase(RefereesActions.checkWritten, (state, { payload }) => adapter.updateOne(state, {
      id: payload.id,
      changes: { hasBeenWritten: true }
    }))
);

export const refereeChecksSelectors = adapter.getSelectors();
