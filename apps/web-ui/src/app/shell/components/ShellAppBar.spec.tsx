import { render } from '@testing-library/react';
import { ShellAppBar } from './ShellAppBar';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';

describe('ShellAppBar', () => {
  test('when user logs out then notifies to logout', () => {
    const onLogout = jest.fn();
    render(<ShellAppBar onNavigationToggle={jest.fn()} onLogout={onLogout} />);

    userEvent.click(screen.getByRole('button', { name: 'user menu' }));
    userEvent.click(screen.getByRole('menuitem', { name: 'logout' }));

    expect(onLogout).toHaveBeenCalled();
    expect(
      screen.queryByRole('menuitem', { name: 'logout' })
    ).not.toBeInTheDocument();
  });

  test('when user closes menu then menu is closed', () => {
    render(<ShellAppBar onNavigationToggle={jest.fn()} />);

    userEvent.click(screen.getByRole('button', { name: 'user menu' }));
    userEvent.keyboard('{esc}');

    expect(
      screen.queryByRole('menuitem', { name: 'logout' })
    ).not.toBeInTheDocument();
  });
});
