import { Api } from './api.commands';

const navigate = () => {
  cy.findByRole('button', { name: 'navigation toggle' }).click();
  cy.findByRole('link', { name: 'current schedule' }).click();
};

const uploadSchedule = (schedulePath: string) => {
  Api.waitForResponse(Api.aliases.getCurrentSchedule);

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
