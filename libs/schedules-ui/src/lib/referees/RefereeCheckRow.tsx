import { FunctionComponent, useCallback } from 'react';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { ClientRefereeCheckModel } from '@soccer-utilities/schedules-ui';
import { refereeCheckMemo } from './referee-check-memo';

export interface RefereeCheckRowProps {
  check: ClientRefereeCheckModel;
  onCopy?: (check: ClientRefereeCheckModel) => void;
}

export const RefereeCheckRow: FunctionComponent<RefereeCheckRowProps> = ({check, onCopy}) => {
  const handleCopyClick = useCallback(() => onCopy ? onCopy(check) : null, [onCopy, check]);
  return (
    <TableRow aria-label={'referee check'}>
      <TableCell aria-label={'date'}>{check.date}</TableCell>
      <TableCell aria-label={'time'}>{check.time}</TableCell>
      <TableCell aria-label={'name'}>{check.name}</TableCell>
      <TableCell aria-label={'amount'} align={'right'}>${check.amount}</TableCell>
      <TableCell aria-label={'memo'}>{refereeCheckMemo(check)}</TableCell>
      <TableCell>
        <IconButton aria-label={'copy check'} onClick={handleCopyClick}>
          <FileCopyIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
