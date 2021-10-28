import { TimesheetsPage } from '../support/timesheets.po';

describe('Timesheets', () => {
  it('should show all timesheets', () => {
    TimesheetsPage.navigate();

    TimesheetsPage.findTimesheets().should('have.length.greaterThan', 0);
  });
});
