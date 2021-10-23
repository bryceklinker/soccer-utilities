import { FunctionComponent, useCallback, useState, MouseEvent } from 'react';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { NoOp, RowFlexBox } from '@soccer-utilities/common-ui';

const styles = {
  appbar: {
    zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
  },
} as const;

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

  return (
    <AppBar position={'fixed'} sx={styles.appbar}>
      <Toolbar>
        <IconButton
          aria-label={'navigation toggle'}
          onClick={onNavigationToggle}
          size="large"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant={'h6'}>BSC Internal</Typography>
        <RowFlexBox flex={1} />
        <IconButton
          aria-label={'user menu'}
          onClick={handleOpenUserMenu}
          size="large"
        >
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
