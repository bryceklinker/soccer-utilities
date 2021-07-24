import {
  createTestingStoreFromActions,
  renderWithProviders,
} from '../../../testing';
import { RefereeChecksPage } from './RefereeChecksPage';
import { RefereesActions } from '../state/referees-actions';
import { ModelFactory } from '@soccer-utilities/testing-support';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { List } from '@soccer-utilities/models';
import { DatePickerTestingHarness } from '@soccer-utilities/schedules-ui/testing';

const CURRENT_TIME = new Date(2021, 6, 10);
describe('RefereeChecksPage', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(CURRENT_TIME);
  });

  test('when rendered then requests to load referee checks', () => {
    const store = createTestingStoreFromActions();
    renderWithProviders(<RefereeChecksPage />, { store });

    expect(store.getActions()).toContainEqual(
      RefereesActions.loadChecks.request()
    );
  });

  test('when loading referee checks then shows loading', () => {
    const store = createTestingStoreFromActions(
      RefereesActions.loadChecks.request()
    );
    renderWithProviders(<RefereeChecksPage />, { store });

    expect(screen.getByLabelText('loading indicator')).toBeInTheDocument();
  });

  test('when loading referee checks then skips requesting to load checks', () => {
    const store = createTestingStoreFromActions(
      RefereesActions.loadChecks.request()
    );
    renderWithProviders(<RefereeChecksPage />, { store });

    expect(store.getActions()).not.toContainEqual(
      RefereesActions.loadChecks.request()
    );
  });

  test('when referee checks already loaded then shows referee checks', () => {
    const checks = ModelFactory.createListResult(
      ModelFactory.createClientRefereeCheckModel,
      3
    );
    const store = createTestingStoreFromActions(
      RefereesActions.loadChecks.success(checks)
    );
    renderWithProviders(<RefereeChecksPage />, { store });

    expect(screen.getAllByLabelText('referee check')).toHaveLength(3);
  });

  test('when referee checks already loaded then skips requesting to load checks', () => {
    const checks = ModelFactory.createListResult(
      ModelFactory.createClientRefereeCheckModel,
      3
    );
    const store = createTestingStoreFromActions(
      RefereesActions.loadChecks.success(checks)
    );
    renderWithProviders(<RefereeChecksPage />, { store });

    expect(store.getActions()).not.toContainEqual(
      RefereesActions.loadChecks.request()
    );
  });

  test('when date range selected then requests to load checks for range', () => {
    const checks = ModelFactory.createListResult(
      ModelFactory.createClientRefereeCheckModel,
      3
    );
    const store = createTestingStoreFromActions(
      RefereesActions.loadChecks.success(checks)
    );
    renderWithProviders(<RefereeChecksPage />, { store });

    DatePickerTestingHarness.changeStart('23');
    DatePickerTestingHarness.changeEnd('24');
    DatePickerTestingHarness.clickSearch();

    expect(store.getActions()).toContainEqual(
      RefereesActions.loadChecks.request({
        start: '2021-07-23',
        end: '2021-07-24',
      })
    );
  });

  test('when date range selected then date range stays selected', () => {
    const checks = ModelFactory.createListResult(
      ModelFactory.createClientRefereeCheckModel,
      3
    );
    const store = createTestingStoreFromActions(
      RefereesActions.loadChecks.success(checks)
    );
    renderWithProviders(<RefereeChecksPage />, { store });

    DatePickerTestingHarness.changeStart('23');
    DatePickerTestingHarness.changeEnd('24');
    DatePickerTestingHarness.clickSearch();

    expect(DatePickerTestingHarness.getStartTextBox()).toHaveValue(
      '2021-07-23'
    );
    expect(DatePickerTestingHarness.getEndTextBox()).toHaveValue('2021-07-24');
  });

  test('when empty dates are searched then notifies to load referee checks', () => {
    const checks = ModelFactory.createListResult(
      ModelFactory.createClientRefereeCheckModel,
      3
    );
    const store = createTestingStoreFromActions(
      RefereesActions.loadChecks.success(checks)
    );
    renderWithProviders(<RefereeChecksPage />, { store });

    DatePickerTestingHarness.clickSearch();

    expect(store.getActions()).toContainEqual(
      RefereesActions.loadChecks.request()
    );
  });

  test('when referee check copied then notifies referee check written', () => {
    const check = ModelFactory.createClientRefereeCheckModel();
    const store = createTestingStoreFromActions(
      RefereesActions.loadChecks.success(List.fromItems(check))
    );
    renderWithProviders(<RefereeChecksPage />, { store });

    userEvent.click(screen.getByRole('button', { name: 'copy check' }));

    expect(store.getActions()).toContainEqual(
      RefereesActions.checkWritten(check)
    );
  });

  test('when check is written then hides check', () => {
    const check = ModelFactory.createClientRefereeCheckModel({
      hasBeenWritten: true,
    });
    const store = createTestingStoreFromActions(
      RefereesActions.loadChecks.success(List.fromItems(check))
    );
    renderWithProviders(<RefereeChecksPage />, { store });

    expect(screen.queryAllByLabelText('referee check')).toHaveLength(0);
  });

  test('when all checks are shown then shows all checks', () => {
    const checks = List.fromItems(
      ModelFactory.createClientRefereeCheckModel({ hasBeenWritten: true }),
      ModelFactory.createClientRefereeCheckModel({ hasBeenWritten: false })
    );
    const store = createTestingStoreFromActions(
      RefereesActions.loadChecks.success(checks)
    );
    renderWithProviders(<RefereeChecksPage />, { store });

    userEvent.click(
      screen.getByRole('checkbox', { name: 'show all checks toggle' })
    );

    expect(screen.getAllByLabelText('referee check')).toHaveLength(2);
  });
});
