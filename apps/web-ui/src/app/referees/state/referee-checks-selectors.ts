import { RootState } from '../../state/root-state';
import {refereeChecksSelectors} from './referee-checks-reducer';
import { createSelector } from '@reduxjs/toolkit';

const selectRefereeChecksState = (state: RootState) => state.refereeChecks;

export const selectAllRefereeChecks = createSelector(
  selectRefereeChecksState,
  refereeChecksSelectors.selectAll
)

export const selectHaveRefereeChecksBeenLoaded = createSelector(
  selectRefereeChecksState,
  s => s.hasBeenLoaded
)
