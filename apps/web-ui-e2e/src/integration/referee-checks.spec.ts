import { RefereeChecksPage } from '../support/referee-checks.po';
import { Api } from '../support/api.commands';
import { format } from 'date-fns';

describe('Referee Checks', () => {
  it('should show referee checks', () => {
    Api.uploadSchedule();

    cy.login();
    RefereeChecksPage.navigate();

    RefereeChecksPage.findChecks().should('have.length.above', 0);
  });

  it('should get referee checks for date range', () => {
    Api.uploadSchedule();

    cy.login();
    RefereeChecksPage.navigate();
    RefereeChecksPage.selectStartDate('22');
    RefereeChecksPage.selectEndDate('23');
    RefereeChecksPage.search();

    const currentYearAndMonth = format(new Date(), 'yyyy-MM');
    RefereeChecksPage.findStartDate().should(
      'have.value',
      `${currentYearAndMonth}-22`
    );
    RefereeChecksPage.findEndDate().should(
      'have.value',
      `${currentYearAndMonth}-23`
    );
  });
});
