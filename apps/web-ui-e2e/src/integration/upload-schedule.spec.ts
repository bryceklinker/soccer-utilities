import { CurrentSchedulePage } from '../support/current-schedule.po';

describe('Upload Schedule', () => {
  it('should allow user to upload a csv game schedule', () => {
    cy.login();

    CurrentSchedulePage.navigate();
    CurrentSchedulePage.uploadSchedule('game-schedule.csv');

    CurrentSchedulePage.findGames().should('have.length.above', 0);
  });
});
