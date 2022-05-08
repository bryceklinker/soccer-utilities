import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateSelector } from './DateSelector';
import { renderWithTheme } from '../testing';

const CURRENT_DATE = new Date(2021, 6, 11);
describe('DateSelector', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(CURRENT_DATE);
  });

  test('when date selected then notifies of change', async () => {
    const onChange = jest.fn();
    renderWithTheme(
      <DateSelector onChange={onChange} value={null} aria-label={'idk'} />
    );

    await changeDate('idk', 'Jul 15, 2021');

    expect(onChange).toHaveBeenCalledWith('2021-07-15');
  });

  async function changeDate(label: string, day: string) {
    await userEvent.click(screen.getByRole('button', { name: label }));
    await userEvent.click(screen.getByRole('button', { name: day }));
  }
});
