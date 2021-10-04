import { FunctionComponent, useCallback, useState, MouseEvent } from 'react';
import {
  AppBar,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import { NoOp, RowFlexBox } from '@soccer-utilities/common-ui';

const useStyles = makeStyles((theme) => ({
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export type ShellAppBarProps = {
  onNavigationToggle: () => void;
  onLogout?: () => void;
};
export const ShellAppBar: FunctionComponent<ShellAppBarProps> = ({
  onNavigationToggle,
  onLogout = NoOp,
}) => {
  const [userMenuElement, setUserMenuElement] =
    useState<HTMLButtonElement | null>(null);

  const handleOpenUserMenu = useCallback(
    (evt: MouseEvent<HTMLButtonElement>) => {
      setUserMenuElement(evt.currentTarget);
    },
    [setUserMenuElement]
  );

  const handleLogout = useCallback(() => {
    onLogout();
    setUserMenuElement(null);
  }, [onLogout, setUserMenuElement]);

  const handleCloseUserMenu = useCallback(() => {
    setUserMenuElement(null);
  }, [setUserMenuElement]);

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
        <Typography variant={'h6'}>BSC Internal</Typography>
        <RowFlexBox flex={1} />
        <IconButton aria-label={'user menu'} onClick={handleOpenUserMenu}>
          <PersonIcon />
        </IconButton>
        <Menu
          open={Boolean(userMenuElement)}
          anchorEl={userMenuElement}
          onClose={handleCloseUserMenu}
        >
          <MenuItem aria-label={'logout'} onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
