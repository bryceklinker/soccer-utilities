import { FunctionComponent } from 'react';
import { TableCell, TableRow, Typography } from '@mui/material';

export const EmptyRefereeReimbursementCheckRow: FunctionComponent = () => {
  return (
    <TableRow aria-label={'empty'}>
      <TableCell colSpan={4}>
        <Typography variant={'h3'}>No Reimbursement Checks Found</Typography>
      </TableCell>
    </TableRow>
  );
};
