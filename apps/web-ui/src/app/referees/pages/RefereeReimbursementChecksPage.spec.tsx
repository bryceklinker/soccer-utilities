import {
  createTestingStoreFromActions,
  renderWithProviders,
  WebUiModelFactory,
} from '../../../testing';
import { RefereesActions } from '../state/referees-actions';
import { RefereeReimbursementChecksPage } from './RefereeReimbursementChecksPage';
import { screen } from '@testing-library/dom';

describe('RefereeReimbursementChecksPage', () => {
  test('when rendered then requests to load reimbursement checks', () => {
    const store = createTestingStoreFromActions();
    renderWithProviders(<RefereeReimbursementChecksPage />, { store });

    expect(store.getActions()).toContainEqual(
      RefereesActions.loadReimbursementChecks.request()
    );
  });

  test('when loading checks then shows loading', () => {
    const store = createTestingStoreFromActions(
      RefereesActions.loadReimbursementChecks.request()
    );
    renderWithProviders(<RefereeReimbursementChecksPage />, { store });

    expect(screen.getByLabelText('loading indicator')).toBeInTheDocument();
  });

  test('when already loading checks then skips requesting checks', () => {
    const store = createTestingStoreFromActions(
      RefereesActions.loadReimbursementChecks.request()
    );
    renderWithProviders(<RefereeReimbursementChecksPage />, { store });

    expect(store.getActions()).not.toContainEqual(
      RefereesActions.loadReimbursementChecks.request()
    );
  });

  test('when checks are already loaded then shows referee checks', () => {
    const checks = WebUiModelFactory.createListResult(
      WebUiModelFactory.createRefereeReimbursementCheck,
      3
    );
    const store = createTestingStoreFromActions(
      RefereesActions.loadReimbursementChecks.success(checks)
    );
    renderWithProviders(<RefereeReimbursementChecksPage />, { store });

    expect(screen.getAllByLabelText('reimbursement check')).toHaveLength(3);
  });

  test('when checks are already loaded then skips requesting checks', () => {
    const checks = WebUiModelFactory.createListResult(
      WebUiModelFactory.createRefereeReimbursementCheck,
      3
    );
    const store = createTestingStoreFromActions(
      RefereesActions.loadReimbursementChecks.success(checks)
    );
    renderWithProviders(<RefereeReimbursementChecksPage />, { store });

    expect(store.getActions()).not.toContainEqual(
      RefereesActions.loadReimbursementChecks.request()
    );
  });
});
