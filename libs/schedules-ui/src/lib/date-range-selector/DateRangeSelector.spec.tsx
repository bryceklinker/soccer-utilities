import { screen } from '@testing-library/react';
import { DateRangeSelector } from './DateRangeSelector';
import { DatePickerTestingHarness } from '../../testing/date-picker-testing-harness';
import { renderWithTheme } from '@soccer-utilities/common-ui/testing';

const CURRENT_DATE = new Date(2015, 3, 30);
const APRIL_22_DATE = '04/22/2015';
const APRIL_23_DATE = '04/23/2015';
describe('DateRangeSelector', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(CURRENT_DATE);
  });

  test('when no dates provided then no dates are selected', () => {
    renderWithTheme(<DateRangeSelector />);

    expect(getStartDateTextBox()).toHaveValue('');
    expect(getEndDateTextBox()).toHaveValue('');
  });

  test('when start date provided then start date is used', () => {
    renderWithTheme(<DateRangeSelector start={'2020-04-30'} />);

    expect(getStartDateTextBox()).toHaveValue('04/30/2020');
    expect(getEndDateTextBox()).toHaveValue('');
  });

  test('when end date provided then end date is used', () => {
    renderWithTheme(<DateRangeSelector end={'2020-04-30'} />);

    expect(getStartDateTextBox()).toHaveValue('');
    expect(getEndDateTextBox()).toHaveValue('04/30/2020');
  });

  test('when start and end date provided then start and end are provided dates', () => {
    renderWithTheme(
      <DateRangeSelector start={'2020-04-30'} end={'2021-04-30'} />
    );

    expect(getStartDateTextBox()).toHaveValue('04/30/2020');
    expect(getEndDateTextBox()).toHaveValue('04/30/2021');
  });

  test('when searched then notifies with start and end dates', () => {
    const onSearch = jest.fn();
    renderWithTheme(<DateRangeSelector onSearch={onSearch} />);

    DatePickerTestingHarness.changeStart(APRIL_22_DATE);
    DatePickerTestingHarness.changeEnd(APRIL_23_DATE);
    DatePickerTestingHarness.clickSearch();

    expect(onSearch).toHaveBeenCalledWith({
      start: '2015-04-22',
      end: '2015-04-23',
    });
  });

  test('when start date filled in without end date then search is disabled', () => {
    renderWithTheme(<DateRangeSelector />);

    DatePickerTestingHarness.changeStart(APRIL_22_DATE);

    expect(DatePickerTestingHarness.getSearchButton()).toBeDisabled();
  });

  test('when end date filled in without start date then search is disabled', () => {
    renderWithTheme(<DateRangeSelector />);

    DatePickerTestingHarness.changeEnd(APRIL_22_DATE);

    expect(DatePickerTestingHarness.getSearchButton()).toBeDisabled();
  });

  test('when searching without dates then notifies of search without range', () => {
    const onSearch = jest.fn();
    renderWithTheme(<DateRangeSelector onSearch={onSearch} />);

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
