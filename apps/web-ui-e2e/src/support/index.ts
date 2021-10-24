import './commands';
import { Api } from './api.commands';

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  Api.setupIntercepts();
});
