import { Box, CssBaseline, makeStyles, Toolbar } from '@material-ui/core';
import { useCallback, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { WelcomePage } from '../../welcome/Welcome';
import { ShellAppBar } from './ShellAppBar';
import { ShellNavigation } from './ShellNavigation';
import { ColumnFlexBox, RowFlexBox } from '@soccer-utilities/common-ui';

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

        <ColumnFlexBox display={'flex'} flex={1} flexDirection={'column'} >
          <Toolbar />
          <ColumnFlexBox className={styles.mainContent}>
            <Switch>
              <Route path={'/welcome'}>
                <WelcomePage />
              </Route>
              <Redirect from={'**'} to={'/welcome'} />
            </Switch>
          </ColumnFlexBox>
        </ColumnFlexBox>

      </RowFlexBox>
    </>
  );
}
