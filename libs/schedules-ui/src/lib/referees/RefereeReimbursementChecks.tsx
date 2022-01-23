import { RefereeReimbursementCheckModel } from '@soccer-utilities/models';
import { FunctionComponent } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { EmptyRefereeReimbursementCheckRow } from './EmptyRefereeReimbursementCheckRow';
import { RefereeReimbursementCheckRow } from './RefereeReimbursementCheckRow';

export interface RefereeReimbursementChecksProps {
  checks: Array<RefereeReimbursementCheckModel>;
}

export const RefereeReimbursementChecks: FunctionComponent<RefereeReimbursementChecksProps> =
  ({ checks }) => {
    const rows =
      checks.length === 0 ? (
        <EmptyRefereeReimbursementCheckRow />
      ) : (
        checks.map((c) => (
          <RefereeReimbursementCheckRow key={c.referee} check={c} />
        ))
      );
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Referee</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Number of Games</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    );
  };
