import { CONFIG } from './config';

const DEFAULT_SCHEDULE = 'game-schedule.csv';

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

export const Api = {
  uploadSchedule,
};
