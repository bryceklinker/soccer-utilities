import { Toolbar } from '@mui/material';
import {
  FunctionComponent,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Route, useLocation, Navigate, Routes } from 'react-router-dom';
import { ShellAppBar } from './ShellAppBar';
import { ShellNavigation } from './ShellNavigation';
import {
  ColumnFlexBox,
  LoadingIndicator,
  NoOp,
  RowFlexBox,
} from '@soccer-utilities/common-ui';
import { getRedirectRoute, ROUTES } from '../routing';
import { ShellNotificationsContainer } from './ShellNotificationsContainer';
import { Role } from '@soccer-utilities/models';

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

const styles = {
  mainContent: {
    padding: 3,
  },
} as const;

export interface ShellViewProps {
  roles?: Array<Role>;
  onLogout?: () => void;
}

export const ShellView: FunctionComponent<ShellViewProps> = ({
  roles = [],
  onLogout = NoOp,
}) => {
  const location = useLocation();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const handleNavigationToggled = useCallback(
    () => setIsNavigationOpen(!isNavigationOpen),
    [isNavigationOpen, setIsNavigationOpen]
  );
  const handleNavigationClosed = useCallback(
    () => setIsNavigationOpen(false),
    [setIsNavigationOpen]
  );

  useEffect(() => {
    handleNavigationClosed();
  }, [location, handleNavigationClosed]);

  const redirectRoute = getRedirectRoute(roles);
  return (
    <>
      <RowFlexBox>
        <ShellAppBar
          onNavigationToggle={handleNavigationToggled}
          onLogout={onLogout}
        />
        <ShellNavigation
          roles={roles}
          isOpen={isNavigationOpen}
          onClose={handleNavigationClosed}
        />

        <ColumnFlexBox display={'flex'} flex={1} flexDirection={'column'}>
          <Toolbar />
          <ColumnFlexBox sx={styles.mainContent}>
            <Routes>
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
              <Route path={'**'}>
                <Navigate to={redirectRoute} />
              </Route>
            </Routes>
          </ColumnFlexBox>
        </ColumnFlexBox>
      </RowFlexBox>
      <ShellNotificationsContainer />
    </>
  );
};
