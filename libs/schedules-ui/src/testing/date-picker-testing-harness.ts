import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

function changeDate(label: string, day: string) {
  userEvent.type(screen.getByRole('textbox', { name: label }), day);
  userEvent.tab();
}

function changeStart(day: string) {
  changeDate('start date', day);
}

function changeEnd(day: string) {
  changeDate('end date', day);
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
