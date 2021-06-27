import { createSelector } from '@reduxjs/toolkit';
import { GameScheduleModel } from '@soccer-utilities/core';
import { currentScheduleInitialState } from './current-schedule-reducer';
import { RootState } from '../../state/root-state';
import { useRootSelector } from '../../state/root-hooks';

const selectCurrentScheduleState = (state: RootState) => state?.currentSchedule || currentScheduleInitialState;
export const selectCurrentSchedule = createSelector(
  selectCurrentScheduleState,
  state => state.lastUpdated ? {lastUpdated: state.lastUpdated, games: state.games} as GameScheduleModel : null
)

export function useCurrentSchedule() {
  return useRootSelector(selectCurrentSchedule);
}
