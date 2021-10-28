import {
  createTestingStoreFromActions,
  renderWithProviders,
  WebUiModelFactory,
} from '../../../testing';
import { TimesheetsPage } from './TimesheetsPage';
import { TimesheetsActions } from '../state/timesheets-actions';
import { screen } from '@testing-library/dom';
import { List } from '@soccer-utilities/models';
import userEvent from '@testing-library/user-event';

describe('TimesheetsPage', () => {
  test('when rendered then requests to load timesheets', () => {
    const store = createTestingStoreFromActions();
    renderWithProviders(<TimesheetsPage />, { store });

    expect(store.getActions()).toContainEqual(
      TimesheetsActions.loadAll.request()
    );
  });

  test('when timesheets are loading then shows loading', () => {
    const store = createTestingStoreFromActions(
      TimesheetsActions.loadAll.request()
    );
    renderWithProviders(<TimesheetsPage />, { store });

    expect(screen.getByLabelText('loading indicator')).toBeInTheDocument();
  });

  test('when timesheets are loaded then shows each timesheet', () => {
    const timesheetResult = WebUiModelFactory.createListResult(
      WebUiModelFactory.createUserTimesheetModel,
      4
    );
    const store = createTestingStoreFromActions(
      TimesheetsActions.loadAll.success(timesheetResult)
    );
    renderWithProviders(<TimesheetsPage />, { store });

    expect(screen.getAllByRole('row', { name: 'timesheet' })).toHaveLength(4);
  });

  test('when timesheet is deleted then notifies to delete timesheet', () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel();
    const store = createTestingStoreFromActions(
      TimesheetsActions.loadAll.success(List.fromItems(timesheet))
    );
    renderWithProviders(<TimesheetsPage />, { store });

    userEvent.click(screen.getByRole('button', { name: 'delete' }));
    userEvent.click(screen.getByRole('button', { name: 'delete confirm' }));

    expect(store.getActions()).toContainEqual(
      TimesheetsActions.delete.request(timesheet)
    );
  });

  test('when timesheet is being deleted then shows timesheet deleting', () => {
    const timesheet = WebUiModelFactory.createUserTimesheetModel();
    const store = createTestingStoreFromActions(
      TimesheetsActions.loadAll.success(List.fromItems(timesheet)),
      TimesheetsActions.delete.request(timesheet)
    );
    renderWithProviders(<TimesheetsPage />, { store });

    expect(screen.getByLabelText('loading indicator')).toBeInTheDocument();
  });
});
