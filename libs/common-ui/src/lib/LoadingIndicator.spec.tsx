import { render, screen } from '@testing-library/react';
import { LoadingIndicator } from './LoadingIndicator';
import { Typography } from '@material-ui/core';

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
    render(<LoadingIndicator show />);

    expect(screen.getByLabelText('loading indicator')).toBeInTheDocument();
  });

  test('when shown with centered then centers loading', () => {
    render(<LoadingIndicator show center />);

    expect(screen.getByLabelText('loading indicator')).toHaveStyle('align-items: center');
    expect(screen.getByLabelText('loading indicator')).toHaveStyle('justify-content: center');
    expect(screen.getByLabelText('loading indicator')).toHaveStyle('justify-items: space-around');
  });

  test('when shown un-centered then loading is missing centering', () => {
    render(<LoadingIndicator show />);

    expect(screen.getByLabelText('loading indicator')).not.toHaveStyle('align-items: center');
    expect(screen.getByLabelText('loading indicator')).not.toHaveStyle('justify-content: center');
    expect(screen.getByLabelText('loading indicator')).not.toHaveStyle('justify-items: space-around');
  });

  test('when shown then shows children', () => {
    render(
      <LoadingIndicator show>
        <Typography aria-label={'inner'}>My stuff</Typography>
      </LoadingIndicator>
    );

    expect(screen.getByLabelText('inner')).toHaveTextContent('My stuff');
  });
});
