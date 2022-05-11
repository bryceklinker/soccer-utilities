import { Role } from '@soccer-utilities/models';

export const ROUTES = {
  INDEX: '/',
  WELCOME: '/welcome',
  CURRENT_SCHEDULE: '/schedules/current',
  CURRENT_TIMESHEET: '/timesheets/current',
  REFEREE_CHECKS: '/referees/checks',
  REFEREE_REIMBURSEMENT_CHECKS: '/referees/reimbursement-checks',
  TIMESHEETS: '/timesheets',
};

export function getRedirectRoute(roles: Array<Role> = []): string {
  if (roles.includes(Role.concessions)) {
    return ROUTES.CURRENT_TIMESHEET;
  }

  return ROUTES.WELCOME;
}
