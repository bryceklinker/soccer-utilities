import { FunctionComponent } from 'react';
import { RefereeReimbursementCheckModel } from '@soccer-utilities/models';
import { TableCell, TableRow } from '@mui/material';
import { Formatter } from '@soccer-utilities/common-ui';

export interface RefereeReimbursementCheckRowProps {
  check: RefereeReimbursementCheckModel;
}

export const RefereeReimbursementCheckRow: FunctionComponent<RefereeReimbursementCheckRowProps> =
  ({ check }) => {
    const numberOfGames = check.games.length;
    return (
      <TableRow aria-label={'reimbursement check'}>
        <TableCell aria-label={'referee'}>{check.referee}</TableCell>
        <TableCell aria-label={'amount'}>
          {Formatter.currency(check.amount)}
        </TableCell>
        <TableCell aria-label={'number of games'}>{numberOfGames}</TableCell>
      </TableRow>
    );
  };
