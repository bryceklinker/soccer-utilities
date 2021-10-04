import {
  createTestingStoreFromActions,
  renderWithProviders,
} from '../../../testing';
import { ShellView } from './ShellView';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { NotificationsActions } from '../../notifications/state/notifications-actions';
import { ModelFactory } from '@soccer-utilities/testing-support';
import { Role } from '@soccer-utilities/models';

describe('ShellView', () => {
  test('when side navigation is opened then side navigation is opened', async () => {
    renderWithProviders(<ShellView />);

    userEvent.click(screen.getByLabelText('navigation toggle'));

    expect(await screen.findByRole('navigation')).toBeVisible();
  });

  test('when side navigation is closed then side navigation is hidden', async () => {
    renderWithProviders(<ShellView />);

    userEvent.click(screen.getByLabelText('navigation toggle'));
    userEvent.click(screen.getByLabelText('navigation toggle'));

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  test('when side navigation closes then side navigation is hidden', async () => {
    renderWithProviders(<ShellView />);

    userEvent.click(screen.getByLabelText('navigation toggle'));
    userEvent.keyboard('{esc}');

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  test('when navigation is triggered then side navigation is hidden', () => {
    renderWithProviders(<ShellView />);

    userEvent.click(screen.getByLabelText('navigation toggle'));
    userEvent.click(screen.getByRole('button', { name: 'welcome' }));

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  test('when rendered with notifications then shows notifications', () => {
    const store = createTestingStoreFromActions(
      NotificationsActions.publish(ModelFactory.createNotificationModel())
    );
    renderWithProviders(<ShellView />, { store });

    expect(screen.getByLabelText('notification')).toBeInTheDocument();
  });

  test('when user with admin role rendered then shows admin links', () => {
    renderWithProviders(<ShellView roles={[Role.admin]} />);

    userEvent.click(screen.getByLabelText('navigation toggle'));

    expect(screen.getByLabelText('current schedule')).toBeInTheDocument();
  });

  test('when rendered then redirects to welcome', () => {
    renderWithProviders(<ShellView roles={[]} />);

    expect(screen.getByLabelText('welcome message')).toBeInTheDocument();
  });

  test('when user has concessions role then redirects to timesheet', () => {
    renderWithProviders(<ShellView roles={[Role.concessions]} />);

    expect(screen.queryByLabelText('welcome message')).not.toBeInTheDocument();
  });

  test('when user logs out then notifies to logout', () => {
    const onLogout = jest.fn();
    renderWithProviders(
      <ShellView roles={[Role.concessions]} onLogout={onLogout} />
    );

    userEvent.click(screen.getByRole('button', { name: 'user menu' }));
    userEvent.click(screen.getByRole('menuitem', { name: 'logout' }));

    expect(onLogout).toHaveBeenCalled();
  });
});
