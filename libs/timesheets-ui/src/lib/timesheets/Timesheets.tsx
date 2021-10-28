import { FunctionComponent } from 'react';
import { UserTimesheetModel } from '@soccer-utilities/models';
import { ColumnFlexBox, NoOp } from '@soccer-utilities/common-ui';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { TimesheetRow } from './TimesheetRow';

export interface TimesheetsProps {
  timesheets: Array<UserTimesheetModel>;
  onDelete?: (timesheet: UserTimesheetModel) => void;
}

export const Timesheets: FunctionComponent<TimesheetsProps> = ({
  timesheets,
  onDelete = NoOp,
}) => {
  const rows = timesheets.map((t) => (
    <TimesheetRow key={t.id} timesheet={t} onDelete={onDelete} />
  ));
  return (
    <ColumnFlexBox>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant={'head'}>Username</TableCell>
            <TableCell variant={'head'}>Time In</TableCell>
            <TableCell variant={'head'}>Time Out</TableCell>
            <TableCell variant={'head'}>Hours</TableCell>
            <TableCell variant={'head'}>Rate</TableCell>
            <TableCell variant={'head'}>Amount</TableCell>
            <TableCell variant={'head'}>Status</TableCell>
            <TableCell variant={'head'} />
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </ColumnFlexBox>
  );
};
