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

  test('when clicked then notifies of click', () => {
    const onClick = jest.fn();
    renderWithTheme(<ConfirmableButton aria-label={'idk'} onClick={onClick} />);

    userEvent.click(screen.getByRole('button', { name: 'idk' }));

    expect(onClick).toHaveBeenCalled();
  });

  test('when initially clicked then shows confirm and cancel', () => {
    renderWithTheme(<ConfirmableButton aria-label={'idk'} />);

    userEvent.click(screen.getByRole('button', { name: 'idk' }));

    expect(
      screen.getByRole('button', { name: 'idk confirm' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'idk cancel' })
    ).toBeInTheDocument();
  });

  test('when confirmed then notifies of confirmation', () => {
    const onConfirm = jest.fn();
    renderWithTheme(
      <ConfirmableButton aria-label={'delete'} onConfirm={onConfirm} />
    );

    userEvent.click(screen.getByRole('button', { name: 'delete' }));
    userEvent.click(screen.getByRole('button', { name: 'delete confirm' }));

    expect(onConfirm).toHaveBeenCalled();
  });

  test('when cancelled then notifies of cancellation', () => {
    const onCancel = jest.fn();
    renderWithTheme(
      <ConfirmableButton aria-label={'delete'} onCancel={onCancel} />
    );

    userEvent.click(screen.getByRole('button', { name: 'delete' }));
    userEvent.click(screen.getByRole('button', { name: 'delete cancel' }));

    expect(onCancel).toHaveBeenCalled();
  });

  test('when confirmed then hides confirm and cancel', () => {
    renderWithTheme(<ConfirmableButton aria-label={'delete'} />);

    userEvent.click(screen.getByRole('button', { name: 'delete' }));
    userEvent.click(screen.getByRole('button', { name: 'delete confirm' }));

    expect(
      screen.queryByRole('button', { name: 'delete confirm' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'delete cancel' })
    ).not.toBeInTheDocument();
  });

  test('when cancelled then hides confirm and cancel', () => {
    renderWithTheme(<ConfirmableButton aria-label={'delete'} />);

    userEvent.click(screen.getByRole('button', { name: 'delete' }));
    userEvent.click(screen.getByRole('button', { name: 'delete cancel' }));

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
