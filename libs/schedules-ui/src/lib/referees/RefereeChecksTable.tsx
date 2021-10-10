import { FunctionComponent } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { EmptyRefereeCheckRow } from './EmptyRefereeCheckRow';
import { RefereeCheckRow } from './RefereeCheckRow';
import { ClientRefereeCheckModel } from '@soccer-utilities/models';

export interface RefereeChecksTableProps {
  checks: Array<ClientRefereeCheckModel>;
  onCopyCheck?: (check: ClientRefereeCheckModel) => void;
}

export const RefereeChecksTable: FunctionComponent<RefereeChecksTableProps> = ({
  checks,
  onCopyCheck,
}) => {
  const rows =
    checks.length === 0 ? (
      <EmptyRefereeCheckRow />
    ) : (
      checks.map((c) => (
        <RefereeCheckRow key={c.id} check={c} onCopy={onCopyCheck} />
      ))
    );
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Referee Name</TableCell>
          <TableCell align={'right'}>Amount</TableCell>
          <TableCell>Memo</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>{rows}</TableBody>
    </Table>
  );
};
