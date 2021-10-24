import { Api } from './api.commands';

const navigate = () => {
  cy.findByRole('button', { name: 'navigation toggle' }).click();
  cy.findByRole('link', { name: 'current timesheet' }).click();
  Api.waitForResponse(Api.aliases.getCurrentTimesheet);
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
