import { render, screen } from '@testing-library/react';
import { DateRangeSelector } from './DateRangeSelector';
import { DatePickerTestingHarness } from '../../testing/date-picker-testing-harness';

const CURRENT_DATE = new Date(2015, 3, 30);
describe('DateRangeSelector', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(CURRENT_DATE);
  });

  test('when no dates provided then no dates are selected', () => {
    render(<DateRangeSelector />);

    expect(getStartDateTextBox()).toHaveValue('');
    expect(getEndDateTextBox()).toHaveValue('');
  });

  test('when start date provided then start date is used', () => {
    render(<DateRangeSelector start={'2020-04-30'} />);

    expect(getStartDateTextBox()).toHaveValue('2020-04-30');
    expect(getEndDateTextBox()).toHaveValue('');
  });

  test('when end date provided then end date is used', () => {
    render(<DateRangeSelector end={'2020-04-30'} />);

    expect(getStartDateTextBox()).toHaveValue('');
    expect(getEndDateTextBox()).toHaveValue('2020-04-30');
  });

  test('when start and end date provided then start and end are provided dates', () => {
    render(<DateRangeSelector start={'2020-04-30'} end={'2021-04-30'} />);

    expect(getStartDateTextBox()).toHaveValue('2020-04-30');
    expect(getEndDateTextBox()).toHaveValue('2021-04-30');
  });

  test('when searched then notifies with start and end dates', () => {
    const onSearch = jest.fn();
    render(<DateRangeSelector onSearch={onSearch} />);

    DatePickerTestingHarness.changeStart('22');
    DatePickerTestingHarness.changeEnd('23');
    DatePickerTestingHarness.clickSearch();

    expect(onSearch).toHaveBeenCalledWith({
      start: '2015-04-22',
      end: '2015-04-23',
    });
  });

  test('when start date filled in without end date then search is disabled', () => {
    render(<DateRangeSelector />);

    DatePickerTestingHarness.changeStart('22');

    expect(DatePickerTestingHarness.getSearchButton()).toBeDisabled();
  });

  test('when end date filled in without start date then search is disabled', () => {
    render(<DateRangeSelector />);

    DatePickerTestingHarness.changeEnd('22');

    expect(DatePickerTestingHarness.getSearchButton()).toBeDisabled();
  });

  test('when searching without dates then notifies of search without range', () => {
    const onSearch = jest.fn();
    render(<DateRangeSelector onSearch={onSearch} />);

    DatePickerTestingHarness.clickSearch();

    expect(onSearch).toHaveBeenCalledWith(undefined);
  });

  function getStartDateTextBox() {
    return screen.getByRole('textbox', { name: 'start date' });
  }

  function getEndDateTextBox() {
    return screen.getByRole('textbox', { name: 'end date' });
  }
});
