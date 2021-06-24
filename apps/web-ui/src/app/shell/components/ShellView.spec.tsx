import { renderWithProviders } from '../../../testing';
import { ShellView } from './ShellView';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';

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
  })
});
