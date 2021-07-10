import { RefereeChecksPage } from '../support/referee-checks.po';
import { Api } from '../support/api.commands';

describe('Referee Checks', () => {

  it('should show referee checks', () => {
    Api.uploadSchedule();

    cy.login();
    RefereeChecksPage.navigate();

    RefereeChecksPage.findChecks().should('have.length.above', 0);
  });
});
