import { createTestingStoreFromActions, renderWithProviders } from '../../../testing';
import { NotificationsActions } from '../../notifications/state/notifications-actions';
import { ModelFactory } from '@soccer-utilities/testing-support';
import { ShellNotificationsContainer } from './ShellNotificationsContainer';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

describe('ShellNotificationsContainer', () => {
  test('when notification published then shows notification', () => {
    const store = createTestingStoreFromActions(
      NotificationsActions.publish(ModelFactory.createNotificationModel())
    );
    renderWithProviders(<ShellNotificationsContainer />, { store });

    expect(screen.getByLabelText('notification')).toBeInTheDocument();
  });

  test('when notification closed then notifies to remove notification', () => {
    const notification = ModelFactory.createNotificationModel();
    const store = createTestingStoreFromActions(NotificationsActions.publish(notification));
    renderWithProviders(<ShellNotificationsContainer />, { store });

    userEvent.click(screen.getByLabelText('notification'));

    expect(store.getActions()).toContainEqual(NotificationsActions.remove(notification));
  });
});
