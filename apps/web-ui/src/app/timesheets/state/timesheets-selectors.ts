import { RootState } from '../../state/root-state';
import { createSelector } from '@reduxjs/toolkit';
import { timesheetAdapter } from './timesheets-reducer';

const { selectById } = timesheetAdapter.getSelectors();
const selectTimesheetsState = (state: RootState) => state.timesheets;

export const selectCurrentTimesheet = createSelector(
  selectTimesheetsState,
  (s) => {
    if (typeof s.current === 'object') {
      return s.current;
    }

    return selectById(s, s.current);
  }
);
