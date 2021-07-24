import { FunctionComponent } from 'react';
import { ColumnFlexBox } from './ColumnFlexBox';
import { Button } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

export type RetryErrorMessageProps = {
  show?: boolean;
  onRetry?: () => void;
};
export const RetryErrorMessage: FunctionComponent<RetryErrorMessageProps> = ({
  children,
  show = false,
  onRetry,
}) => {
  if (!show) {
    return null;
  }

  return (
    <ColumnFlexBox aria-label={'errors'}>
      {children}
      <Button
        variant={'contained'}
        aria-label={'retry button'}
        onClick={onRetry}
        startIcon={<RefreshIcon />}
      >
        Retry
      </Button>
    </ColumnFlexBox>
  );
};
