import { ShellNavigation } from './ShellNavigation';
import { screen } from '@testing-library/react';
import { Role } from '@soccer-utilities/models';
import { renderWithProviders } from '../../../testing';

describe('ShellNavigation', () => {
  test('when user has admin role then shows all links', () => {
    renderWithProviders(<ShellNavigation isOpen={true} roles={[Role.admin]} />);

    expect(screen.getByLabelText('welcome')).toBeVisible();
    expect(screen.getByLabelText('current schedule')).toBeVisible();
    expect(screen.getByLabelText('referee checks')).toBeVisible();
    expect(screen.getByLabelText('current timesheet')).toBeVisible();
    expect(screen.getByLabelText('timesheets')).toBeVisible();
  });

  test('when user has concessions role then shows timesheet and welcome links', () => {
    renderWithProviders(
      <ShellNavigation isOpen={true} roles={[Role.concessions]} />
    );

    expect(screen.getByLabelText('welcome')).toBeVisible();
    expect(screen.getByLabelText('current timesheet')).toBeVisible();

    expect(screen.queryByLabelText('current schedule')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('referee checks')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('timesheets')).not.toBeInTheDocument();
  });

  test('when user has no roles then shows welcome link only', () => {
    renderWithProviders(<ShellNavigation isOpen={true} roles={[]} />);

    expect(screen.getByLabelText('welcome')).toBeVisible();

    expect(
      screen.queryByLabelText('current timesheet')
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText('current schedule')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('referee checks')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('timesheets')).not.toBeInTheDocument();
  });
});
