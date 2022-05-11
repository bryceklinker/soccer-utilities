import {
  createTestingStoreFromActions,
  renderWithProviders,
} from '../../../testing';
import { ShellView } from './ShellView';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/dom';
import { NotificationsActions } from '../../notifications/state/notifications-actions';
import { ModelFactory } from '@soccer-utilities/testing-support';
import { Role } from '@soccer-utilities/models';

describe('ShellView', () => {
  test('when side navigation is opened then side navigation is opened', async () => {
    renderWithProviders(<ShellView />);

    await userEvent.click(screen.getByLabelText('navigation toggle'));

    expect(await screen.findByRole('navigation')).toBeVisible();
  });

  test('when side navigation is closed then side navigation is hidden', async () => {
    renderWithProviders(<ShellView />);

    await userEvent.click(screen.getByLabelText('navigation toggle'));
    await userEvent.click(screen.getByLabelText('navigation toggle'));

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  test('when side navigation closes then side navigation is hidden', async () => {
    renderWithProviders(<ShellView />);

    await userEvent.click(screen.getByLabelText('navigation toggle'));
    await userEvent.keyboard('{Escape}');

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  test('when navigation is triggered then side navigation is hidden', async () => {
    renderWithProviders(<ShellView />);

    await userEvent.click(screen.getByLabelText('navigation toggle'));
    await userEvent.keyboard('{Escape}');

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  test('when rendered with notifications then shows notifications', () => {
    const store = createTestingStoreFromActions(
      NotificationsActions.publish(ModelFactory.createNotificationModel())
    );
    renderWithProviders(<ShellView />, { store });

    expect(screen.getByLabelText('notification')).toBeInTheDocument();
  });

  test('when user with admin role rendered then shows admin links', async () => {
    renderWithProviders(<ShellView roles={[Role.admin]} />);

    await userEvent.click(screen.getByLabelText('navigation toggle'));

    expect(screen.getByLabelText('current schedule')).toBeInTheDocument();
  });

  test('when user logs out then notifies to logout', async () => {
    const onLogout = jest.fn();
    renderWithProviders(
      <ShellView roles={[Role.concessions]} onLogout={onLogout} />
    );

    await userEvent.click(screen.getByRole('button', { name: 'user menu' }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'logout' }));

    expect(onLogout).toHaveBeenCalled();
  });
});
