import { render, screen } from '@testing-library/react';
import { Typography } from '@material-ui/core';
import { RetryErrorMessage } from './RetryErrorMessage';
import userEvent from '@testing-library/user-event';

describe('RetryErrorMessage', () => {
  test('when shown then displays error message', () => {
    render(
      <RetryErrorMessage show>
        <Typography aria-label={'not good'}>Not Good</Typography>
      </RetryErrorMessage>
    );

    expect(screen.getByLabelText('not good')).toHaveTextContent('Not Good');
  });

  test('when hidden then hides content', () => {
    render(<RetryErrorMessage />);

    expect(screen.queryByLabelText('errors')).not.toBeInTheDocument();
  });

  test('when retry triggered then notifies to retry', () => {
    const onRetry = jest.fn();
    render(<RetryErrorMessage show onRetry={onRetry} />);

    userEvent.click(screen.getByLabelText('retry button'));

    expect(onRetry).toHaveBeenCalled();
  })
});
