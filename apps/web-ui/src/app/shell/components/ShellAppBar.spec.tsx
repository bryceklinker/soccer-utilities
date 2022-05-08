import { render } from '@testing-library/react';
import { ShellAppBar } from './ShellAppBar';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';

describe('ShellAppBar', () => {
  test('when user logs out then notifies to logout', async () => {
    const onLogout = jest.fn();
    render(<ShellAppBar onNavigationToggle={jest.fn()} onLogout={onLogout} />);

    await userEvent.click(screen.getByRole('button', { name: 'user menu' }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'logout' }));

    expect(onLogout).toHaveBeenCalled();
    expect(
      screen.queryByRole('menuitem', { name: 'logout' })
    ).not.toBeInTheDocument();
  });

  test('when user closes menu then menu is closed', async () => {
    render(<ShellAppBar onNavigationToggle={jest.fn()} />);

    await userEvent.click(screen.getByRole('button', { name: 'user menu' }));
    await userEvent.keyboard('{esc}');

    expect(
      screen.queryByRole('menuitem', { name: 'logout' })
    ).not.toBeInTheDocument();
  });
});
