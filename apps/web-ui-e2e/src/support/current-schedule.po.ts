import { CONFIG } from './config';

const navigate = () => {
  const { api } = CONFIG;
  cy.intercept('GET', `${api.url}/schedules/current`).as('current-schedule');

  cy.findByRole('button', { name: 'navigation toggle' }).click();
  cy.findByRole('button', { name: 'current schedule' }).click();
};

const uploadSchedule = (schedulePath: string) => {
  cy.wait('@current-schedule', { requestTimeout: 60000 });

  cy.findByRole('button', { name: 'upload schedule' }).click();
  cy.findByLabelText('schedule file').attachFile(schedulePath);
  cy.findByRole('button', { name: 'upload schedule button' }).click();
};

const findGames = () => cy.findAllByLabelText('game');

export const CurrentSchedulePage = {
  navigate,
  uploadSchedule,
  findGames,
};
