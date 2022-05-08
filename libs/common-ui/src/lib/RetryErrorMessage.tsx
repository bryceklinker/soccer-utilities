import { ColumnFlexBox } from './ColumnFlexBox';
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { FCWithChildren } from './with-children';

export type RetryErrorMessageProps = {
  show?: boolean;
  onRetry?: () => void;
};
export const RetryErrorMessage: FCWithChildren<RetryErrorMessageProps> = ({
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
