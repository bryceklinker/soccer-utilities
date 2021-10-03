import {
  generateRootStateFromActions,
  WebUiModelFactory,
} from '../../../testing';
import { TimesheetsActions } from './timesheets-actions';
import { selectCurrentTimesheet } from './timesheets-selectors';

describe('timesheets-selectors', () => {
  describe('select current timesheet', () => {
    test('when current is a timesheet then returns timesheet', () => {
      const expected = WebUiModelFactory.createUserTimesheetModel();
      const state = generateRootStateFromActions(
        TimesheetsActions.loadCurrent.success(expected)
      );

      expect(selectCurrentTimesheet(state)).toEqual(expected);
    });

    test('when current is an id then returns timesheet with id', () => {
      const expected = WebUiModelFactory.createUserTimesheetModel();
      const state = generateRootStateFromActions(
        TimesheetsActions.clockIn.success(expected)
      );

      expect(selectCurrentTimesheet(state)).toEqual(expected);
    });

    test('when current is unset then returns null timesheet', () => {
      const state = generateRootStateFromActions();

      expect(selectCurrentTimesheet(state)).toEqual(null);
    });
  });
});
