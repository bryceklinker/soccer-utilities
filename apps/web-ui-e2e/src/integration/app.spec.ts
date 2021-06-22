import { getLoading } from '../support/app.po';

describe('web-ui', () => {
  beforeEach(() => cy.visit('/'));

  it('should display loading', () => {
    getLoading().should('be.visible');
  });
});
