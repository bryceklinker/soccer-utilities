import { FunctionComponent } from 'react';
import { Divider, Drawer, List, ListItem, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { ColumnFlexBox, NoOp } from '@soccer-utilities/common-ui';
import { ROUTES } from '../routing';
import { Role } from '@soccer-utilities/models';

const styles = {
  drawer: {
    width: 240,
  },
} as const;

export type ShellNavigationProps = {
  isOpen: boolean;
  roles?: Array<Role>;
  onClose?: () => void;
};
export const ShellNavigation: FunctionComponent<ShellNavigationProps> = ({
  isOpen,
  roles = [],
  onClose = NoOp,
}) => {
  const isAdmin = roles.includes(Role.admin);
  const isConcessions = roles.includes(Role.concessions) || isAdmin;
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <Toolbar />
      <Divider />
      <ColumnFlexBox sx={styles.drawer}>
        <List component={'nav'}>
          <LinkButton to={ROUTES.WELCOME} aria-label={'welcome'}>
            Welcome
          </LinkButton>
          <LinkButton
            visible={isConcessions}
            to={ROUTES.CURRENT_TIMESHEET}
            aria-label={'current timesheet'}
          >
            Current Timesheet
          </LinkButton>
          <LinkButton
            visible={isAdmin}
            to={ROUTES.TIMESHEETS}
            aria-label={'timesheets'}
          >
            Timesheets
          </LinkButton>
          <LinkButton
            visible={isAdmin}
            to={ROUTES.CURRENT_SCHEDULE}
            aria-label={'current schedule'}
          >
            Current Schedule
          </LinkButton>
          <LinkButton
            visible={isAdmin}
            to={ROUTES.REFEREE_CHECKS}
            aria-label={'referee checks'}
          >
            Referee Checks
          </LinkButton>
          <LinkButton
            visible={isAdmin}
            to={ROUTES.REFEREE_REIMBURSEMENT_CHECKS}
            aria-label={'referee reimbursement checks'}
          >
            Referee Reimbursement Checks
          </LinkButton>
        </List>
      </ColumnFlexBox>
    </Drawer>
  );
};

interface LinkButtonProps {
  visible?: boolean;
  to: string;
}

const LinkButton: FunctionComponent<LinkButtonProps> = ({
  to,
  visible = true,
  ...rest
}) => {
  if (!visible) {
    return null;
  }

  return <ListItem button component={Link} to={to} {...rest} />;
};
