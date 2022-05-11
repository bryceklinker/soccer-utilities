import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

async function changeDate(label: string, day: string) {
  await userEvent.type(screen.getByRole('textbox', { name: label }), day);
  await userEvent.tab();
}

async function changeStart(day: string) {
  await changeDate('start date', day);
}

async function changeEnd(day: string) {
  await changeDate('end date', day);
}

async function clickSearch() {
  await userEvent.click(getSearchButton());
}

function getStartTextBox() {
  return screen.getByRole('textbox', { name: 'start date' });
}

function getEndTextBox() {
  return screen.getByRole('textbox', { name: 'end date' });
}

function getSearchButton() {
  return screen.getByRole('button', { name: 'search date range' });
}

export const DatePickerTestingHarness = {
  changeStart,
  changeEnd,
  clickSearch,
  getEndTextBox,
  getStartTextBox,
  getSearchButton,
};
