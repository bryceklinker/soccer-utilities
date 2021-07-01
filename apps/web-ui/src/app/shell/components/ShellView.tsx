import { Box, CssBaseline, makeStyles, Toolbar } from '@material-ui/core';
import { useCallback, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { WelcomePage } from '../../welcome/Welcome';
import { ShellAppBar } from './ShellAppBar';
import { ShellNavigation } from './ShellNavigation';
import { ColumnFlexBox, RowFlexBox } from '@soccer-utilities/common-ui';
import { ROUTES } from '../routing';
import { CurrentSchedulePage } from '../../current-schedule/pages/CurrentSchedulePage';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    padding: theme.spacing(3)
  }
}));

export function ShellView() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const handleNavigationToggled = useCallback(() => setIsNavigationOpen(!isNavigationOpen), [isNavigationOpen, setIsNavigationOpen]);
  const handleNavigationClosed = useCallback(() => setIsNavigationOpen(false), [setIsNavigationOpen]);

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
              <Redirect from={ROUTES.REDIRECT} to={ROUTES.WELCOME} />
            </Switch>
          </ColumnFlexBox>
        </ColumnFlexBox>

      </RowFlexBox>
    </>
  );
}