import { CONFIG } from './config';

const DEFAULT_SCHEDULE = 'game-schedule.csv';
const DEFAULT_API_TIMEOUT = 60000;
const aliases = {
  getRefereeChecks: '@referee-checks',
  getCurrentSchedule: '@current-schedule',
  getCurrentTimesheet: '@current-timesheet',
  getCurrentUser: '@current-user',
};

const scrubAlias = (alias: string): string => alias.replace('@', '');

const uploadSchedule = (fixture: string = DEFAULT_SCHEDULE) => {
  const { api } = CONFIG;

  cy.fixture(fixture, 'binary').then((schedule) => {
    const blob = Cypress.Blob.binaryStringToBlob(schedule, 'text/csv');
    const form = new FormData();
    form.append('scheduleFile', blob, fixture);

    cy.getToken().then(({ body }) =>
      cy.form_request(`${api.url}/schedules/current`, {
        headers: {
          Authorization: `${body.token_type} ${body.access_token}`,
        },
        form: form,
      })
    );
  });
};

const waitForResponse = (alias: string) => {
  cy.wait(alias, { requestTimeout: DEFAULT_API_TIMEOUT });
};

const setupIntercepts = () => {
  const { api } = CONFIG;
  cy.intercept('GET', `${api.url}/schedules/current`).as(
    scrubAlias(aliases.getCurrentSchedule)
  );
  cy.intercept('GET', `${api.url}/timesheets/current`).as(
    scrubAlias(aliases.getCurrentTimesheet)
  );
  cy.intercept('GET', `${api.url}/users/current`).as(
    scrubAlias(aliases.getCurrentUser)
  );
  cy.intercept('GET', `${api.url}/referees/checks*`).as(
    scrubAlias(aliases.getRefereeChecks)
  );
};

export const Api = {
  aliases,
  setupIntercepts,
  uploadSchedule,
  waitForResponse,
};
