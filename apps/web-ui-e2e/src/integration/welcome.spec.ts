import { WelcomePage } from '../support/welcome.po';

describe('Welcome', () => {
  beforeEach(() => cy.visit('/'));

  it('should display loading', () => {
    cy.login();

    WelcomePage.findMessage().should('contain.text', 'Welcome');
  });
});
