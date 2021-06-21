import { render, screen } from '@testing-library/react';
import { LoadingIndicator } from './LoadingIndicator';

describe('LoadingIndicator', () => {
  test('when show not specified then loading is showing', () => {
    render(<LoadingIndicator />);

    expect(screen.getByLabelText('loading indicator')).toBeInTheDocument();
  });

  test('when show is false then loading is missing', () => {
    render(<LoadingIndicator show={false} />);

    expect(screen.queryByLabelText('loading indicator')).not.toBeInTheDocument();
  });

  test('when show is true then loading is showing', () => {
    render(<LoadingIndicator show={true} />);

    expect(screen.getByLabelText('loading indicator')).toBeInTheDocument();
  })
});
