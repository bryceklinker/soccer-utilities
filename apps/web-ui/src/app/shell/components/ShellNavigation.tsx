import { FunctionComponent } from 'react';
import { Divider, Drawer, makeStyles, Toolbar } from '@material-ui/core';
import { ColumnFlexBox } from '@soccer-utilities/common-ui';

const useStyles = makeStyles(() => ({
  drawer: {
    width: 240
  }
}))

export type ShellNavigationProps = {
  isOpen: boolean;
  onClose: () => void;
}
export const ShellNavigation: FunctionComponent<ShellNavigationProps> = ({ isOpen, onClose }) => {
  const styles = useStyles();
  return (
    <>
      <Drawer role={'navigation'} open={isOpen} onClose={onClose}>
        <Toolbar />
        <Divider />
        <ColumnFlexBox className={styles.drawer}>

        </ColumnFlexBox>
      </Drawer>
    </>
  );
};
