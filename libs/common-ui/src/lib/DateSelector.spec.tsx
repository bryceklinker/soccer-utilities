import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateSelector } from './DateSelector';
import { renderWithTheme } from '../testing';
import { format } from 'date-fns';

describe('DateSelector', () => {
  test('when date selected then notifies of change', async () => {
    const onChange = jest.fn();
    renderWithTheme(
      <DateSelector onChange={onChange} value={null} aria-label={'idk'} />
    );

    const displayedDate = format(new Date(), 'MMM d, yyyy');
    await changeDate('idk', displayedDate);

    const expectedDate = format(new Date(), 'yyyy-MM-dd');
    expect(onChange).toHaveBeenCalledWith(expectedDate);
  });

  async function changeDate(label: string, day: string) {
    await userEvent.click(screen.getByRole('button', { name: label }));
    await userEvent.click(screen.getByRole('button', { name: day }));
  }
});
