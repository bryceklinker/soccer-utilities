import { getWelcomeMessage } from '../support/welcome.po';

describe('Welcome', () => {
  beforeEach(() => cy.visit('/'));

  it('should display loading', () => {
    cy.login();

    getWelcomeMessage().should('contain.text', 'Welcome');
  });
});
