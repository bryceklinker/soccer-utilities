import { FunctionComponent } from 'react';
import { AppBar, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export type ShellAppBarProps = {
  onNavigationToggle: () => void;
};
export const ShellAppBar: FunctionComponent<ShellAppBarProps> = ({
  onNavigationToggle,
}) => {
  const styles = useStyles();
  return (
    <AppBar position={'fixed'} className={styles.appbar}>
      <Toolbar>
        <IconButton
          aria-label={'navigation toggle'}
          onClick={onNavigationToggle}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
