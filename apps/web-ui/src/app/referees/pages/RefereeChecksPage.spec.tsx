import { createTestingStore, renderWithProviders } from '../../../testing';
import { RefereeChecksPage } from './RefereeChecksPage';
import { RefereesActions } from '../state/referees-actions';
import { DatePickerTestingHarness, ModelFactory } from '@soccer-utilities/testing-support';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { selectAllRefereeChecks } from '../state/referee-checks-selectors';

const CURRENT_TIME = new Date(2021, 6, 10);
describe('RefereeChecksPage', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern')
      .setSystemTime(CURRENT_TIME);
  });

  test('when rendered then requests to load referee checks', () => {
    const store = createTestingStore();
    renderWithProviders(<RefereeChecksPage />, { store });

    expect(store.getActions()).toContainEqual(RefereesActions.loadChecks.request());
  });

  test('when loading referee checks then shows loading', () => {
    const store = createTestingStore(RefereesActions.loadChecks.request());
    renderWithProviders(<RefereeChecksPage />, { store });

    expect(screen.getByLabelText('loading indicator')).toBeInTheDocument();
  });

  test('when loading referee checks then skips requesting to load checks', () => {
    const store = createTestingStore(RefereesActions.loadChecks.request());
    renderWithProviders(<RefereeChecksPage />, { store });

    expect(store.getActions()).not.toContainEqual(RefereesActions.loadChecks.request());
  });

  test('when referee checks already loaded then shows referee checks', () => {
    const checks = ModelFactory.createMany(ModelFactory.createRefereeCheck, 3);
    const store = createTestingStore(RefereesActions.loadChecks.success({ items: checks }));
    renderWithProviders(<RefereeChecksPage />, { store });

    expect(screen.getAllByLabelText('referee check')).toHaveLength(3);
  });

  test('when referee checks already loaded then skips requesting to load checks', () => {
    const checks = ModelFactory.createMany(ModelFactory.createRefereeCheck, 3);
    const store = createTestingStore(RefereesActions.loadChecks.success({ items: checks }));
    renderWithProviders(<RefereeChecksPage />, { store });

    expect(store.getActions()).not.toContainEqual(RefereesActions.loadChecks.request());
  });

  test('when date range selected then requests to load checks for range', () => {
    const checks = ModelFactory.createMany(ModelFactory.createRefereeCheck, 3);
    const store = createTestingStore(RefereesActions.loadChecks.success({ items: checks }));
    renderWithProviders(<RefereeChecksPage />, { store });

    DatePickerTestingHarness.changeStart('23');
    DatePickerTestingHarness.changeEnd('24');
    DatePickerTestingHarness.clickSearch();

    expect(store.getActions()).toContainEqual(RefereesActions.loadChecks.request({
      start: '2021-07-23',
      end: '2021-07-24'
    }));
  });

  test('when date range selected then date range stays selected', () => {
    const checks = ModelFactory.createMany(ModelFactory.createRefereeCheck, 3);
    const store = createTestingStore(RefereesActions.loadChecks.success({ items: checks }));
    renderWithProviders(<RefereeChecksPage />, { store });

    DatePickerTestingHarness.changeStart('23');
    DatePickerTestingHarness.changeEnd('24');
    DatePickerTestingHarness.clickSearch();

    expect(DatePickerTestingHarness.getStartTextBox()).toHaveValue('2021-07-23');
    expect(DatePickerTestingHarness.getEndTextBox()).toHaveValue('2021-07-24');
  });

  test('when referee check copied then notifies referee check written', () => {
    const check = ModelFactory.createRefereeCheck();
    const store = createTestingStore(RefereesActions.loadChecks.success({ items: [check] }));
    renderWithProviders(<RefereeChecksPage />, { store });

    userEvent.click(screen.getByRole('button', { name: 'copy check' }));

    const clientRefereeCheck = selectAllRefereeChecks(store.getState())[0];
    expect(store.getActions()).toContainEqual(RefereesActions.checkWritten(clientRefereeCheck));
  });
});
