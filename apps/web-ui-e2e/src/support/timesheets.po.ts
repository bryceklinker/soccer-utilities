import { Api } from './api.commands';

const navigate = () => {
  cy.findByRole('button', { name: 'navigation toggle' }).click();
  cy.findByRole('link', { name: 'timesheets' }).click();
  Api.waitForResponse(Api.aliases.getTimesheets);
};

const findTimesheets = () => cy.findAllByRole('row', { name: 'timesheet' });

export const TimesheetsPage = {
  navigate,
  findTimesheets,
};
