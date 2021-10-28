import {
  UiUserTimesheetModel,
  UserTimesheetModel,
} from '@soccer-utilities/models';
import { FunctionComponent, useCallback } from 'react';
import { TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Formatter, NoOp, RowFlexBox } from '@soccer-utilities/common-ui';
import { ConfirmableButton } from '@soccer-utilities/common-ui';

export interface TimesheetRowProps {
  timesheet: UiUserTimesheetModel;
  onDelete?: (timesheet: UserTimesheetModel) => void;
}

export const TimesheetRow: FunctionComponent<TimesheetRowProps> = ({
  timesheet,
  onDelete = NoOp,
}) => {
  const handleConfirmDelete = useCallback(
    () => onDelete(timesheet),
    [timesheet, onDelete]
  );
  return (
    <TableRow aria-label={'timesheet'}>
      <TableCell>{timesheet.username}</TableCell>
      <TableCell>{Formatter.datetime(timesheet.timeIn)}</TableCell>
      <TableCell>{Formatter.datetime(timesheet.timeOut)}</TableCell>
      <TableCell>{Formatter.number(timesheet.hours)}</TableCell>
      <TableCell>{Formatter.currency(timesheet.rate)}</TableCell>
      <TableCell>{Formatter.currency(timesheet.amount)}</TableCell>
      <TableCell>{timesheet.status}</TableCell>
      <TableCell>
        <RowFlexBox width={'4rem'}>
          <ConfirmableButton
            aria-label={'delete'}
            onConfirm={handleConfirmDelete}
            isLoading={timesheet.isDeleting}
          >
            <DeleteIcon color={'error'} />
          </ConfirmableButton>
        </RowFlexBox>
      </TableCell>
    </TableRow>
  );
};
