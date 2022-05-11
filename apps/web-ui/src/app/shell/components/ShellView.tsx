import { FunctionComponent, lazy, Suspense } from 'react';
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import { LoadingIndicator, NoOp } from '@soccer-utilities/common-ui';
import { getRedirectRoute, ROUTES } from '../routing';
import { Role } from '@soccer-utilities/models';
import { ShellLayout } from './ShellLayout';

const WelcomePage = lazy(() =>
  import('../../welcome/Welcome').then((c) => ({ default: c.WelcomePage }))
);

const CurrentSchedulePage = lazy(() =>
  import('../../current-schedule/pages/CurrentSchedulePage').then((c) => ({
    default: c.CurrentSchedulePage,
  }))
);

const RefereeChecksPage = lazy(() =>
  import('../../referees/pages/RefereeChecksPage').then((c) => ({
    default: c.RefereeChecksPage,
  }))
);

const RefereeReimbursementChecksPage = lazy(() =>
  import('../../referees/pages/RefereeReimbursementChecksPage').then((c) => ({
    default: c.RefereeReimbursementChecksPage,
  }))
);

const CurrentTimesheetPage = lazy(() =>
  import('../../timesheets/pages/CurrentTimesheetPage').then((c) => ({
    default: c.CurrentTimesheetPage,
  }))
);

const TimesheetsPage = lazy(() =>
  import('../../timesheets/pages/TimesheetsPage').then((c) => ({
    default: c.TimesheetsPage,
  }))
);

export interface ShellViewProps {
  roles?: Array<Role>;
  onLogout?: () => void;
}

export const ShellView: FunctionComponent<ShellViewProps> = ({
  roles = [],
  onLogout = NoOp,
}) => {
  const redirectRoute = getRedirectRoute(roles);
  return (
    <Routes>
      <Route
        path={ROUTES.INDEX}
        element={<ShellLayout roles={roles} onLogout={onLogout} />}
      >
        <Route
          path={ROUTES.WELCOME}
          element={
            <Suspense fallback={<LoadingIndicator show center />}>
              <WelcomePage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.CURRENT_SCHEDULE}
          element={
            <Suspense fallback={<LoadingIndicator show center />}>
              <CurrentSchedulePage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.REFEREE_CHECKS}
          element={
            <Suspense fallback={<LoadingIndicator show center />}>
              <RefereeChecksPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.REFEREE_REIMBURSEMENT_CHECKS}
          element={
            <Suspense fallback={<LoadingIndicator show center />}>
              <RefereeReimbursementChecksPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.CURRENT_TIMESHEET}
          element={
            <Suspense fallback={<LoadingIndicator show center />}>
              <CurrentTimesheetPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.TIMESHEETS}
          element={
            <Suspense fallback={<LoadingIndicator show center />}>
              <TimesheetsPage />
            </Suspense>
          }
        />
        <Route path={'*'} element={<Navigate to={redirectRoute} />} />
      </Route>
    </Routes>
  );
};
