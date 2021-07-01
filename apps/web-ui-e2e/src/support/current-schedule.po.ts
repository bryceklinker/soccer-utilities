export const visitCurrentSchedule = () => {
  cy.findByRole('button', {name: 'toggle navigation'});
  cy.findByRole('navigation', {name: 'current schedule'});
}

export const uploadSchedule = (schedulePath: string) => {
  cy.findByRole('button', {name: 'upload schedule'});
  cy.findByLabelText('schedule file').attachFile(schedulePath);
  cy.findByRole('button', {name: 'upload schedule button'});
}

export const getScheduledGames = () => cy.findAllByLabelText('scheduled game');