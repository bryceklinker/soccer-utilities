import { renderWithTheme } from '../testing';
import { ConfirmableButton } from './ConfirmableButton';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ConfirmableButton', () => {
  test('when rendered then shows content', () => {
    renderWithTheme(
      <ConfirmableButton aria-label={'idk'}>
        <div aria-label={'content'} />
      </ConfirmableButton>
    );

    expect(screen.getByLabelText('content')).toBeInTheDocument();
  });

  test('when rendered as hidden then button is hidden', () => {
    renderWithTheme(
      <ConfirmableButton aria-label={'idk'} show={false}>
        <div aria-label={'content'} />
      </ConfirmableButton>
    );

    expect(
      screen.queryByRole('button', { name: 'idk' })
    ).not.toBeInTheDocument();
  });

  test('when clicked then notifies of click', async () => {
    const onClick = jest.fn();
    renderWithTheme(<ConfirmableButton aria-label={'idk'} onClick={onClick} />);

    await userEvent.click(screen.getByRole('button', { name: 'idk' }));

    expect(onClick).toHaveBeenCalled();
  });

  test('when initially clicked then shows confirm and cancel', async () => {
    renderWithTheme(<ConfirmableButton aria-label={'idk'} />);

    await userEvent.click(screen.getByRole('button', { name: 'idk' }));

    expect(
      screen.getByRole('button', { name: 'idk confirm' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'idk cancel' })
    ).toBeInTheDocument();
  });

  test('when confirmed then notifies of confirmation', async () => {
    const onConfirm = jest.fn();
    renderWithTheme(
      <ConfirmableButton aria-label={'delete'} onConfirm={onConfirm} />
    );

    await userEvent.click(screen.getByRole('button', { name: 'delete' }));
    await userEvent.click(
      screen.getByRole('button', { name: 'delete confirm' })
    );

    expect(onConfirm).toHaveBeenCalled();
  });

  test('when cancelled then notifies of cancellation', async () => {
    const onCancel = jest.fn();
    renderWithTheme(
      <ConfirmableButton aria-label={'delete'} onCancel={onCancel} />
    );

    await userEvent.click(screen.getByRole('button', { name: 'delete' }));
    await userEvent.click(
      screen.getByRole('button', { name: 'delete cancel' })
    );

    expect(onCancel).toHaveBeenCalled();
  });

  test('when confirmed then hides confirm and cancel', async () => {
    renderWithTheme(<ConfirmableButton aria-label={'delete'} />);

    await userEvent.click(screen.getByRole('button', { name: 'delete' }));
    await userEvent.click(
      screen.getByRole('button', { name: 'delete confirm' })
    );

    expect(
      screen.queryByRole('button', { name: 'delete confirm' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'delete cancel' })
    ).not.toBeInTheDocument();
  });

  test('when cancelled then hides confirm and cancel', async () => {
    renderWithTheme(<ConfirmableButton aria-label={'delete'} />);

    await userEvent.click(screen.getByRole('button', { name: 'delete' }));
    await userEvent.click(
      screen.getByRole('button', { name: 'delete cancel' })
    );

    expect(
      screen.queryByRole('button', { name: 'delete confirm' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'delete cancel' })
    ).not.toBeInTheDocument();
  });

  test('when loading then shows loading indicator', () => {
    renderWithTheme(
      <ConfirmableButton aria-label={'delete'} isLoading={true} />
    );

    expect(screen.getByLabelText('loading indicator')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'delete' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'delete confirm' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'delete cancel' })
    ).not.toBeInTheDocument();
  });
});
