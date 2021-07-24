import { CONFIG } from './config';

const navigate = () => {
  const { api } = CONFIG;
  cy.intercept('GET', `${api.url}/referees/checks*`).as('referee-checks');

  cy.findByRole('button', { name: 'navigation toggle' }).click();
  cy.findByRole('button', { name: 'referee checks' }).click();
  cy.wait('@referee-checks', { requestTimeout: 60000 });
};

const selectDate = (label: string, day: string) => {
  cy.findByRole('button', { name: label }).click();
  cy.findByRole('button', { name: day }).click();
  cy.findByRole('button', { name: 'OK' }).click();
};

const selectStartDate = (day: string) => {
  selectDate('start date', day);
};

const selectEndDate = (day: string) => {
  selectDate('end date', day);
};

const search = () => {
  cy.findByRole('button', { name: 'search date range' }).click();
};

const findChecks = () => cy.findAllByLabelText('referee check');
const findStartDate = () => cy.findByRole('textbox', { name: 'start date' });
const findEndDate = () => cy.findByRole('textbox', { name: 'end date' });

export const RefereeChecksPage = {
  navigate,
  findChecks,
  selectStartDate,
  selectEndDate,
  search,
  findStartDate,
  findEndDate,
};
