import { RootState } from '../../state/root-state';
import {refereeChecksSelectors} from './referee-checks-reducer';
import { createSelector } from '@reduxjs/toolkit';

const selectRefereeChecksState = (state: RootState) => state.refereeChecks;

export interface RefereeCheckFilters {
  showAll: boolean;
}

export const selectAllRefereeChecks = ({showAll}: RefereeCheckFilters) => createSelector(
  selectRefereeChecksState,
  state => {
    const checks = refereeChecksSelectors.selectAll(state);
    return showAll
       ? checks
       : checks.filter(c => !c.hasBeenWritten);
  }
)

export const selectHaveRefereeChecksBeenLoaded = createSelector(
  selectRefereeChecksState,
  s => s.hasBeenLoaded
)
