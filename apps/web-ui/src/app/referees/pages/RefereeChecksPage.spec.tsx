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

const JULY_23_2021 = '07/23/2021';
const JULY_24_2021 = '07/24/2021';
describe('RefereeChecksPage', () => {
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

  test('when date range selected then requests to load checks for range', async () => {
    const checks = ModelFactory.createListResult(
      ModelFactory.createClientRefereeCheckModel,
      3
    );
    const store = createTestingStoreFromActions(
      RefereesActions.loadChecks.success(checks)
    );
    renderWithProviders(<RefereeChecksPage />, { store });

    await DatePickerTestingHarness.changeStart(JULY_23_2021);
    await DatePickerTestingHarness.changeEnd(JULY_24_2021);
    await DatePickerTestingHarness.clickSearch();

    expect(store.getActions()).toContainEqual(
      RefereesActions.loadChecks.request({
        start: '2021-07-23',
        end: '2021-07-24',
      })
    );
  });

  test('when date range selected then date range stays selected', async () => {
    const checks = ModelFactory.createListResult(
      ModelFactory.createClientRefereeCheckModel,
      3
    );
    const store = createTestingStoreFromActions(
      RefereesActions.loadChecks.success(checks)
    );
    renderWithProviders(<RefereeChecksPage />, { store });

    await DatePickerTestingHarness.changeStart(JULY_23_2021);
    await DatePickerTestingHarness.changeEnd(JULY_24_2021);
    await DatePickerTestingHarness.clickSearch();

    expect(DatePickerTestingHarness.getStartTextBox()).toHaveValue(
      '07/23/2021'
    );
    expect(DatePickerTestingHarness.getEndTextBox()).toHaveValue('07/24/2021');
  });

  test('when empty dates are searched then notifies to load referee checks', async () => {
    const checks = ModelFactory.createListResult(
      ModelFactory.createClientRefereeCheckModel,
      3
    );
    const store = createTestingStoreFromActions(
      RefereesActions.loadChecks.success(checks)
    );
    renderWithProviders(<RefereeChecksPage />, { store });

    await DatePickerTestingHarness.clickSearch();

    expect(store.getActions()).toContainEqual(
      RefereesActions.loadChecks.request()
    );
  });

  test('when referee check copied then notifies referee check written', async () => {
    const check = ModelFactory.createClientRefereeCheckModel();
    const store = createTestingStoreFromActions(
      RefereesActions.loadChecks.success(List.fromItems(check))
    );
    renderWithProviders(<RefereeChecksPage />, { store });

    await userEvent.click(screen.getByRole('button', { name: 'copy check' }));

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

  test('when all checks are shown then shows all checks', async () => {
    const checks = List.fromItems(
      ModelFactory.createClientRefereeCheckModel({ hasBeenWritten: true }),
      ModelFactory.createClientRefereeCheckModel({ hasBeenWritten: false })
    );
    const store = createTestingStoreFromActions(
      RefereesActions.loadChecks.success(checks)
    );
    renderWithProviders(<RefereeChecksPage />, { store });

    await userEvent.click(
      screen.getByRole('checkbox', { name: 'show all checks toggle' })
    );

    expect(screen.getAllByLabelText('referee check')).toHaveLength(2);
  });
});
