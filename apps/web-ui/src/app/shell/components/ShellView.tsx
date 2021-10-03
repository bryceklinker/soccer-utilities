import { CssBaseline, makeStyles, Toolbar } from '@material-ui/core';
import {
  lazy,
  useCallback,
  useEffect,
  useState,
  Suspense,
  FunctionComponent,
} from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { ShellAppBar } from './ShellAppBar';
import { ShellNavigation } from './ShellNavigation';
import {
  ColumnFlexBox,
  LoadingIndicator,
  RowFlexBox,
} from '@soccer-utilities/common-ui';
import { ROUTES } from '../routing';
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

const CurrentTimesheetPage = lazy(() =>
  import('../../timesheets/pages/CurrentTimesheetPage').then((c) => ({
    default: c.CurrentTimesheetPage,
  }))
);

const useStyles = makeStyles((theme) => ({
  mainContent: {
    padding: theme.spacing(3),
  },
}));

export interface ShellViewProps {
  roles?: Array<Role>;
}

export const ShellView: FunctionComponent<ShellViewProps> = ({
  roles = [],
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

  const styles = useStyles();
  return (
    <>
      <CssBaseline />
      <RowFlexBox>
        <ShellAppBar onNavigationToggle={handleNavigationToggled} />
        <ShellNavigation
          roles={roles}
          isOpen={isNavigationOpen}
          onClose={handleNavigationClosed}
        />

        <ColumnFlexBox display={'flex'} flex={1} flexDirection={'column'}>
          <Toolbar />
          <ColumnFlexBox className={styles.mainContent}>
            <Switch>
              <Route path={ROUTES.WELCOME}>
                <Suspense fallback={<LoadingIndicator show center />}>
                  <WelcomePage />
                </Suspense>
              </Route>
              <Route path={ROUTES.CURRENT_SCHEDULE}>
                <Suspense fallback={<LoadingIndicator show center />}>
                  <CurrentSchedulePage />
                </Suspense>
              </Route>
              <Route path={ROUTES.REFEREE_CHECKS}>
                <Suspense fallback={<LoadingIndicator show center />}>
                  <RefereeChecksPage />
                </Suspense>
              </Route>
              <Route path={ROUTES.CURRENT_TIMESHEET}>
                <Suspense fallback={<LoadingIndicator show center />}>
                  <CurrentTimesheetPage />
                </Suspense>
              </Route>
              <Redirect from={ROUTES.REDIRECT} to={ROUTES.WELCOME} />
            </Switch>
          </ColumnFlexBox>
        </ColumnFlexBox>
      </RowFlexBox>
      <ShellNotificationsContainer />
    </>
  );
};
