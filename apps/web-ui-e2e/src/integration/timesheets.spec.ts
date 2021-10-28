import { TimesheetsPage } from '../support/timesheets.po';

describe('Timesheets', () => {
  it('should show all timesheets', () => {
    cy.login();
    TimesheetsPage.navigate();

    TimesheetsPage.findTimesheets().should('have.length.greaterThan', 0);
  });
});
