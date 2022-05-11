import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { ColumnFlexBox, RowFlexBox } from '@soccer-utilities/common-ui';
import { ShellAppBar } from './ShellAppBar';
import { ShellNavigation } from './ShellNavigation';
import { useLocation, Outlet } from 'react-router-dom';
import { Toolbar } from '@mui/material';
import { Role } from '@soccer-utilities/models';
import { ShellNotificationsContainer } from './ShellNotificationsContainer';

const styles = {
  mainContent: {
    padding: 3,
  },
} as const;

export type ShellLayoutProps = {
  roles: Array<Role>;
  onLogout: () => void;
};

export const ShellLayout: FunctionComponent<ShellLayoutProps> = ({
  roles,
  onLogout,
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
  return (
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
          <Outlet />
        </ColumnFlexBox>
      </ColumnFlexBox>
      <ShellNotificationsContainer />
    </RowFlexBox>
  );
};
