import { Box, CssBaseline, makeStyles, Toolbar } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { WelcomePage } from '../../welcome/Welcome';
import { ShellAppBar } from './ShellAppBar';
import { ShellNavigation } from './ShellNavigation';
import { ColumnFlexBox, RowFlexBox } from '@soccer-utilities/common-ui';
import { ROUTES } from '../routing';
import { CurrentSchedulePage } from '../../current-schedule/pages/CurrentSchedulePage';
import { RefereeChecksPage } from '../../referees/pages/RefereeChecksPage';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    padding: theme.spacing(3)
  }
}));

export function ShellView() {
  const location = useLocation();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const handleNavigationToggled = useCallback(() => setIsNavigationOpen(!isNavigationOpen), [isNavigationOpen, setIsNavigationOpen]);
  const handleNavigationClosed = useCallback(() => setIsNavigationOpen(false), [setIsNavigationOpen]);

  useEffect(() => { handleNavigationClosed() }, [location, handleNavigationClosed])

  const styles = useStyles();
  return (
    <>
      <CssBaseline />
      <RowFlexBox>
        <ShellAppBar onNavigationToggle={handleNavigationToggled} />
        <ShellNavigation isOpen={isNavigationOpen} onClose={handleNavigationClosed} />

        <ColumnFlexBox display={'flex'} flex={1} flexDirection={'column'}>
          <Toolbar />
          <ColumnFlexBox className={styles.mainContent}>
            <Switch>
              <Route path={ROUTES.WELCOME}>
                <WelcomePage />
              </Route>
              <Route path={ROUTES.CURRENT_SCHEDULE}>
                <CurrentSchedulePage />
              </Route>
              <Route path={ROUTES.REFEREE_CHECKS}>
                <RefereeChecksPage />
              </Route>
              <Redirect from={ROUTES.REDIRECT} to={ROUTES.WELCOME} />
            </Switch>
          </ColumnFlexBox>
        </ColumnFlexBox>

      </RowFlexBox>
    </>
  );
}
