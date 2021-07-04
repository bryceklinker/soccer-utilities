export const visitCurrentSchedule = () => {
  cy.findByRole('button', {name: 'navigation toggle'}).click();
  cy.findByRole('button', {name: 'current schedule'}).click();
}

export const uploadSchedule = (schedulePath: string) => {
  cy.findByRole('button', {name: 'upload schedule'}).click();
  cy.findByLabelText('schedule file').attachFile(schedulePath);
  cy.findByRole('button', {name: 'upload schedule button'}).click();
}

export const getScheduledGames = () => cy.findAllByLabelText('scheduled game');
