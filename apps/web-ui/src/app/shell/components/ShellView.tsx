import { Box } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import { WelcomePage } from '../../welcome/Welcome';

export function ShellView() {
  return (
    <Box display={'flex'} flex={1} flexDirection={'row'}>
      <Switch>
        <Route path={'/welcome'}>
          <WelcomePage />
        </Route>
        <Redirect from={'**'} to={'/welcome'} />
      </Switch>
    </Box>
  );
}
