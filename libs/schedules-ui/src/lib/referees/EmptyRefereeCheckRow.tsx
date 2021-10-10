import { FunctionComponent } from 'react';
import { TableCell, TableRow, Typography } from '@mui/material';

export const EmptyRefereeCheckRow: FunctionComponent = () => {
  return (
    <TableRow aria-label={'empty'}>
      <TableCell colSpan={6}>
        <Typography variant={'h3'}>No Referee Checks Found</Typography>
      </TableCell>
    </TableRow>
  );
};
