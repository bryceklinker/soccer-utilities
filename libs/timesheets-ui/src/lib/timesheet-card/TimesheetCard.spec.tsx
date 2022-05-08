import { ModelFactory } from '@soccer-utilities/testing-support';
import { TimesheetStatus } from '@soccer-utilities/models';
import { render, screen } from '@testing-library/react';
import { TimesheetCard } from './TimesheetCard';
import { formatISO, parseISO } from 'date-fns';
import userEvent from '@testing-library/user-event';

describe('TimesheetCard', () => {
  test('when rendered then shows timesheet info', () => {
    const timeInDate = parseISO('2021-09-23T08:45:54.789Z');
    const timeOutDate = parseISO('2021-09-23T12:45:21.123Z');
    const timesheet = ModelFactory.createUserTimesheetModel({
      status: TimesheetStatus.Paid,
      timeIn: formatISO(timeInDate),
      timeOut: formatISO(timeOutDate),
      rate: 13,
      amount: 52,
      hours: 4,
    });

    render(<TimesheetCard timesheet={timesheet} />);

    expect(screen.getByRole('heading', { name: 'title' })).toHaveTextContent(
      timesheet.username
    );
    expect(screen.getByLabelText('rate')).toHaveTextContent('13');
    expect(screen.getByLabelText('hours')).toHaveTextContent('4');
    expect(screen.getByLabelText('amount')).toHaveTextContent('52');
    expect(screen.getByLabelText('status')).toHaveTextContent(
      TimesheetStatus.Paid
    );
    expect(screen.getByLabelText('time in')).toHaveTextContent(
      timeInDate.toLocaleDateString()
    );
    expect(screen.getByLabelText('time in')).toHaveTextContent(
      timeInDate.toLocaleTimeString()
    );
    expect(screen.getByLabelText('time out')).toHaveTextContent(
      timeOutDate.toLocaleDateString()
    );
    expect(screen.getByLabelText('time out')).toHaveTextContent(
      timeOutDate.toLocaleTimeString()
    );
  });

  test('when new timesheet rendered then masks missing data', () => {
    const timesheet = ModelFactory.createUserTimesheetModel({
      status: TimesheetStatus.New,
    });

    render(<TimesheetCard timesheet={timesheet} />);

    expect(screen.getByLabelText('hours')).toHaveTextContent('N/A');
    expect(screen.getByLabelText('amount')).toHaveTextContent('N/A');
    expect(screen.getByLabelText('status')).toHaveTextContent(
      TimesheetStatus.New
    );
    expect(screen.getByLabelText('time in')).toHaveTextContent('N/A');
    expect(screen.getByLabelText('time out')).toHaveTextContent('N/A');
  });

  test('when new timesheet rendered then clocking in is allowed', () => {
    const timesheet = ModelFactory.createUserTimesheetModel({
      status: TimesheetStatus.New,
    });

    render(<TimesheetCard timesheet={timesheet} />);

    expect(screen.getByRole('button', { name: 'clock in' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'clock out' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'pay' })).toBeDisabled();
  });

  test('when open timesheet rendered then clocking out is allowed', () => {
    const timesheet = ModelFactory.createUserTimesheetModel({
      status: TimesheetStatus.Open,
    });

    render(<TimesheetCard timesheet={timesheet} />);

    expect(screen.getByRole('button', { name: 'clock out' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'clock in' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'pay' })).toBeDisabled();
  });

  test('when completed timesheet rendered then paying is allowed', () => {
    const timesheet = ModelFactory.createUserTimesheetModel({
      status: TimesheetStatus.Complete,
    });

    render(<TimesheetCard timesheet={timesheet} />);

    expect(screen.getByRole('button', { name: 'pay' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'clock in' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'clock out' })).toBeDisabled();
  });

  test('when clock in triggered then notifies to clock in', async () => {
    const onClockIn = jest.fn();
    const timesheet = ModelFactory.createUserTimesheetModel({
      status: TimesheetStatus.New,
    });
    render(<TimesheetCard timesheet={timesheet} onClockIn={onClockIn} />);

    await userEvent.click(screen.getByRole('button', { name: 'clock in' }));

    expect(onClockIn).toHaveBeenCalledWith(timesheet);
  });

  test('when clock out triggered then notifies to clock out', async () => {
    const onClockOut = jest.fn();
    const timesheet = ModelFactory.createUserTimesheetModel({
      status: TimesheetStatus.Open,
    });
    render(<TimesheetCard timesheet={timesheet} onClockOut={onClockOut} />);

    await userEvent.click(screen.getByRole('button', { name: 'clock out' }));

    expect(onClockOut).toHaveBeenCalledWith(timesheet);
  });

  test('when pay triggered then notifies to pay', async () => {
    const onPay = jest.fn();
    const timesheet = ModelFactory.createUserTimesheetModel({
      status: TimesheetStatus.Complete,
    });
    render(<TimesheetCard timesheet={timesheet} onPay={onPay} />);

    await userEvent.click(screen.getByRole('button', { name: 'pay' }));

    expect(onPay).toHaveBeenCalledWith(timesheet);
  });

  test('when pay is disabled then pay is disabled', () => {
    const timesheet = ModelFactory.createUserTimesheetModel({
      status: TimesheetStatus.Complete,
    });
    render(<TimesheetCard timesheet={timesheet} disablePay={true} />);

    expect(screen.getByRole('button', { name: 'pay' })).toBeDisabled();
  });
});
