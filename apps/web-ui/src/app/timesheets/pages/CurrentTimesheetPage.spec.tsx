import {
  createTestingStoreFromActions,
  renderWithProviders,
  WebUiModelFactory,
} from '../../../testing';
import { CurrentTimesheetPage } from './CurrentTimesheetPage';
import { TimesheetsActions } from '../state/timesheets-actions';
import { screen } from '@testing-library/dom';
import { Role, TimesheetStatus } from '@soccer-utilities/models';
import userEvent from '@testing-library/user-event';
import { AuthActions } from '../../auth/state/auth-actions';

describe('CurrentTimesheetPage', () => {
  test('when rendered then requests to load current timesheet', () => {
    const store = createTestingStoreFromActions();
    renderWithProviders(<CurrentTimesheetPage />, { store });

    expect(store.getActions()).toContainEqual(
      TimesheetsActions.loadCurrent.request()
    );
  });

  test('when loading current timesheet then shows loading', () => {
    const store = createTestingStoreFromActions(
      TimesheetsActions.loadCurrent.request()
    );
    renderWithProviders(<CurrentTimesheetPage />, { store });

    expect(screen.getByLabelText('loading indicator')).toBeInTheDocument();
  });

  test('when rendered with timesheet then shows timesheet', () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel();
    const store = createTestingStoreFromActions(
      TimesheetsActions.loadCurrent.success(timesheet)
    );

    renderWithProviders(<CurrentTimesheetPage />, { store });

    expect(screen.getByLabelText('title')).toHaveTextContent(
      timesheet.username
    );
  });

  test('when user clocks in then requests to clock in', async () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel({
      status: TimesheetStatus.New,
    });
    const store = createTestingStoreFromActions(
      TimesheetsActions.loadCurrent.success(timesheet)
    );
    renderWithProviders(<CurrentTimesheetPage />, { store });

    await userEvent.click(screen.getByRole('button', { name: 'clock in' }));

    expect(store.getActions()).toContainEqual(
      TimesheetsActions.clockIn.request()
    );
  });

  test('when user clocks out then requests to clock out', async () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel({
      status: TimesheetStatus.Open,
    });
    const store = createTestingStoreFromActions(
      TimesheetsActions.loadCurrent.success(timesheet)
    );
    renderWithProviders(<CurrentTimesheetPage />, { store });

    await userEvent.click(screen.getByRole('button', { name: 'clock out' }));

    expect(store.getActions()).toContainEqual(
      TimesheetsActions.clockOut.request()
    );
  });

  test('when admin user pays timesheet then requests to pay timesheet', async () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel({
      status: TimesheetStatus.Complete,
    });
    const user = WebUiModelFactory.createUser({
      roles: [{ name: Role.admin }],
    });
    const store = createTestingStoreFromActions(
      AuthActions.loadCurrentUser.success(user),
      TimesheetsActions.loadCurrent.success(timesheet)
    );
    renderWithProviders(<CurrentTimesheetPage />, { store });

    await userEvent.click(screen.getByRole('button', { name: 'pay' }));

    expect(store.getActions()).toContainEqual(
      TimesheetsActions.pay.request(timesheet)
    );
  });

  test('when normal user views completed timesheet then pay is disabled', () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel({
      status: TimesheetStatus.Complete,
    });
    const user = WebUiModelFactory.createUser({
      roles: [{ name: Role.concessions }],
    });
    const store = createTestingStoreFromActions(
      AuthActions.loadCurrentUser.success(user),
      TimesheetsActions.loadCurrent.success(timesheet)
    );
    renderWithProviders(<CurrentTimesheetPage />, { store });

    expect(screen.getByRole('button', { name: 'pay' })).toBeDisabled();
  });
});
