import { Api } from '../support/api.commands';
import { RefereeReimbursementChecksPage } from '../support/referee-reimbursement-checks.po';

describe('Referee Reimbursement Checks', () => {
  it('should show referee reimbursement checks', () => {
    Api.uploadSchedule();

    cy.login();
    RefereeReimbursementChecksPage.navigate();

    RefereeReimbursementChecksPage.findChecks().should('have.length.above', 0);
  });
});
