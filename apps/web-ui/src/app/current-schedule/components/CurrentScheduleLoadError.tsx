import { FunctionComponent } from 'react';
import { Button, Typography } from '@material-ui/core';
import { RetryErrorMessage } from '@soccer-utilities/common-ui';

export type CurrentScheduleLoadErrorProps = {
  onRetry?: () => void;
  onUpload?: () => void;
}

export const CurrentScheduleLoadError: FunctionComponent<CurrentScheduleLoadErrorProps> = ({onRetry, onUpload}) => {
  return (
    <RetryErrorMessage show onRetry={onRetry}>
      <Typography variant={'h4'}>Failed to load current schedule</Typography>
      <Button variant={'contained'} aria-label={'upload schedule'} onClick={onUpload}>
        Upload Schedule
      </Button>
    </RetryErrorMessage>
  );
};
