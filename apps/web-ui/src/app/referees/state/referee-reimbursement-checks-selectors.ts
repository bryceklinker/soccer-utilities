import { refereeReimbursementChecksSelectors } from './referee-reimbursement-checks-reducer';
import { RootState } from '../../state/root-state';
import { createSelector } from '@reduxjs/toolkit';

const selectRefereeReimbursementChecksState = (state: RootState) =>
  state.refereeReimbursementChecks;

export const selectAllRefereeReimbursementChecks = createSelector(
  selectRefereeReimbursementChecksState,
  refereeReimbursementChecksSelectors.selectAll
);

export const selectHaveRefereeReimbursementChecksBeenLoaded = createSelector(
  selectRefereeReimbursementChecksState,
  (s) => s.hasBeenLoaded
);
