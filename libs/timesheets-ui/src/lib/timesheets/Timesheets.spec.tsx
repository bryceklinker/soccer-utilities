import { renderWithTheme } from '@soccer-utilities/common-ui/testing';
import { ModelFactory } from '@soccer-utilities/testing-support';
import { Timesheets } from './Timesheets';
import { screen } from '@testing-library/react';
import { TimesheetStatus } from '@soccer-utilities/models';
import userEvent from '@testing-library/user-event';

describe('Timesheets', () => {
  test('when timesheets are rendered then shows each timesheet', () => {
    const timesheets = ModelFactory.createMany(
      ModelFactory.createUiUserTimesheetModel,
      4
    );
    renderWithTheme(<Timesheets timesheets={timesheets} />);

    expect(screen.getAllByRole('row', { name: 'timesheet' })).toHaveLength(4);
  });

  test('when timesheet rendered then shows timesheet overview', () => {
    const timesheet = ModelFactory.createUiUserTimesheetModel({
      rate: 12.5,
      amount: 40,
      timeIn: '2021-09-23T05:23:00.000Z',
      timeOut: '2021-09-23T07:23:00.000Z',
      hours: 999,
      status: TimesheetStatus.Paid,
    });
    renderWithTheme(<Timesheets timesheets={[timesheet]} />);

    const row = screen.getByRole('row', { name: 'timesheet' });
    expect(row).toHaveTextContent(timesheet.username);
    expect(row).toHaveTextContent(TimesheetStatus.Paid);
    expect(row).toHaveTextContent('$12.50');
    expect(row).toHaveTextContent('$40.00');
    expect(row).toHaveTextContent('999');
    expect(row).toHaveTextContent('9/23/2021 5:23:00 AM');
    expect(row).toHaveTextContent('9/23/2021 7:23:00 AM');
  });

  test('when timesheet deleted then triggers delete timesheet', () => {
    const onDelete = jest.fn();
    const timesheet = ModelFactory.createUiUserTimesheetModel();
    renderWithTheme(
      <Timesheets timesheets={[timesheet]} onDelete={onDelete} />
    );

    userEvent.click(screen.getByRole('button', { name: 'delete' }));
    userEvent.click(screen.getByRole('button', { name: 'delete confirm' }));

    expect(onDelete).toHaveBeenCalledWith(timesheet);
  });

  test('when timesheet is being deleted then shows loading for timesheet', () => {
    const timesheet = ModelFactory.createUiUserTimesheetModel({
      isDeleting: true,
    });
    renderWithTheme(<Timesheets timesheets={[timesheet]} />);

    expect(screen.getByLabelText('loading indicator')).toBeInTheDocument();
  });
});
