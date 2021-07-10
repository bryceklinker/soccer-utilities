const navigate = () => {
  cy.findByRole('button', {name: 'navigation toggle'}).click();
  cy.findByRole('button', {name: 'referee checks'}).click();
}

const findChecks = () => cy.findAllByLabelText('referee check');

export const RefereeChecksPage = {
  navigate,
  findChecks
}
