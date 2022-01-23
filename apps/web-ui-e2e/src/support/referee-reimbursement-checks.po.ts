import { Api } from './api.commands';

const navigate = () => {
  cy.findByRole('button', { name: 'navigation toggle' }).click();
  cy.findByRole('link', { name: 'referee reimbursement checks' }).click();
  Api.waitForResponse(Api.aliases.getRefereeReimbursementChecks);
};

const findChecks = () => cy.findAllByLabelText('reimbursement check');

export const RefereeReimbursementChecksPage = {
  navigate,
  findChecks,
};
