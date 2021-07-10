import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

function changeDate(label: string, day: string) {
  userEvent.click(screen.getByRole('button', { name: label }));
  userEvent.click(screen.getByRole('button', { name: day }));
  userEvent.click(screen.getByRole('button', { name: 'OK' }));
  removeDialogManuallySinceItDoesNotHappenLikeItDoesInABrowser();
}

function removeDialogManuallySinceItDoesNotHappenLikeItDoesInABrowser() {
  /*
  I hate this as much as anyone, but it appears that the date picker doesn't close after clicking 'OK'
  Even putting a keyboard event of '{esc}' didn't seem to work.
   */
  document.body.querySelectorAll('div')[0].removeAttribute('aria-hidden');
}

export const DatePickerTestingHarness = {
  changeDate
}
