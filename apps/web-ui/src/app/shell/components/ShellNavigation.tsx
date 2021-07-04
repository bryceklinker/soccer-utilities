import { FunctionComponent } from 'react';
import { Divider, Drawer, List, ListItem, makeStyles, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ColumnFlexBox } from '@soccer-utilities/common-ui';
import { ROUTES } from '../routing';

const useStyles = makeStyles(() => ({
  drawer: {
    width: 240
  }
}));

export type ShellNavigationProps = {
  isOpen: boolean;
  onClose: () => void;
}
export const ShellNavigation: FunctionComponent<ShellNavigationProps> = ({ isOpen, onClose }) => {
  const styles = useStyles();
  return (
    <>
      <Drawer open={isOpen} onClose={onClose}>
        <Toolbar />
        <Divider />
        <ColumnFlexBox className={styles.drawer}>
          <List component={'nav'}>
            <ListItem button component={Link} to={ROUTES.CURRENT_SCHEDULE} aria-label={'current schedule'}>
              Current Schedule
            </ListItem>
          </List>
        </ColumnFlexBox>
      </Drawer>
    </>
  );
};
