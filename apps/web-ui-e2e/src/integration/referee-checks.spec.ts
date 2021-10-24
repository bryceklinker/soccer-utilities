import { RefereeChecksPage } from '../support/referee-checks.po';
import { Api } from '../support/api.commands';

describe('Referee Checks', () => {
  it('should show referee checks', () => {
    Api.uploadSchedule();

    cy.login();
    RefereeChecksPage.navigate();

    RefereeChecksPage.findChecks().should('have.length.above', 0);
  });

  it('should get referee checks for date range', () => {
    Api.uploadSchedule();

    cy.login();

    RefereeChecksPage.navigate();
    RefereeChecksPage.selectStartDate('07/23/2021');
    RefereeChecksPage.selectEndDate('07/24/2021');
    RefereeChecksPage.search();

    RefereeChecksPage.findStartDate().should('have.value', `07/23/2021`);
    RefereeChecksPage.findEndDate().should('have.value', `07/24/2021`);
  });
});
