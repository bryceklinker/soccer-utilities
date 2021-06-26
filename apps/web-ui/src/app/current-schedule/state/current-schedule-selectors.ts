import { RootState, useRootSelector } from '../../state';
import { createSelector } from '@reduxjs/toolkit';
import { GameScheduleModel } from '@soccer-utilities/core';
import { selectIsLoading } from '../../loading';
import { CurrentScheduleActions } from './current-schedule-actions';

const selectCurrentScheduleState = (state: RootState) => state.currentSchedule;
export const selectCurrentSchedule = createSelector(
  selectCurrentScheduleState,
  state => state.lastUpdated ? {lastUpdated: state.lastUpdated, games: state.games} as GameScheduleModel : null
)

export function useCurrentSchedule() {
  return useRootSelector(selectCurrentSchedule);
}

export function useIsCurrentScheduleLoading() {
  return useRootSelector(selectIsLoading(CurrentScheduleActions.load.request));
}
