import { CONFIG } from './config';

const navigate = () => {
  const { api } = CONFIG;
  cy.intercept('GET', `${api.url}/timesheets/current`).as('current-timesheet');

  cy.findByRole('button', { name: 'navigation toggle' }).click();
  cy.findByRole('button', { name: 'current timesheet' }).click();
  cy.wait('@current-timesheet', { requestTimeout: 60000 });
};

const findRate = () => cy.findByLabelText('rate');
const findTimeIn = () => cy.findByLabelText('time in');
const findTimeOut = () => cy.findByLabelText('time out');
const clockIn = () => cy.findByRole('button', { name: 'clock in' }).click();
const clockOut = () => cy.findByRole('button', { name: 'clock out' }).click();
const pay = () => cy.findByRole('button', { name: 'pay' }).click();

export const CurrentTimesheetPage = {
  navigate,
  clockIn,
  clockOut,
  pay,
  findTimeIn,
  findTimeOut,
  findRate,
};
