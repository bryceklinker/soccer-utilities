import { CurrentTimesheetPage } from '../support/current-timesheet.po';

describe('Timesheets', () => {
  it('should allow user to fill in timesheet', () => {
    cy.login();

    CurrentTimesheetPage.navigate();
    CurrentTimesheetPage.clockIn();
    CurrentTimesheetPage.clockOut();

    CurrentTimesheetPage.findRate().should('contain.text', '12');
    CurrentTimesheetPage.findTimeIn().should('not.contain.text', 'N/A');
    CurrentTimesheetPage.findTimeOut().should('not.contain.text', 'N/A');
  });
});
