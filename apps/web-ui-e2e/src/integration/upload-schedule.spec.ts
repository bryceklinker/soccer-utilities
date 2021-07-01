import { getScheduledGames, uploadSchedule, visitCurrentSchedule } from '../support/current-schedule.po';

describe('Upload Schedule', () => {
  it('should allow user to upload a csv game schedule', () => {
    cy.login();

    visitCurrentSchedule();
    uploadSchedule('game-schedule.csv');

    getScheduledGames().should('have.length.above', 0);
  });
});