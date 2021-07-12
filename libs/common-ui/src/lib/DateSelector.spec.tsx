import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateSelector } from './DateSelector';


const CURRENT_DATE = new Date(2021, 6, 11);
describe('DateSelector', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern')
      .setSystemTime(CURRENT_DATE);
  });

  test('when date selected then notifies of change', () => {
    const onChange = jest.fn();
    render(<DateSelector onChange={onChange} value={null} aria-label={'idk'} />);

    changeDate('idk', '15');

    expect(onChange).toHaveBeenCalledWith('2021-07-15');
  });

  test('when date cleared then notifies of change', () => {
    const onChange = jest.fn();
    render(<DateSelector onChange={onChange} value={null} aria-label={'other'} />);

    userEvent.click(screen.getByRole('button', { name: 'other' }));
    userEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(onChange).toHaveBeenCalledWith(null);
  });

  function changeDate(label: string, day: string) {
    userEvent.click(screen.getByRole('button', { name: label }));
    userEvent.click(screen.getByRole('button', { name: day }));
    userEvent.click(screen.getByRole('button', { name: 'OK' }));
  }
});
