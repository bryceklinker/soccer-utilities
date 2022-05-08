import { CircularProgress } from '@mui/material';
import { ColumnFlexBox } from './ColumnFlexBox';
import { FCWithChildren } from './with-children';

type LoadingIndicatorProps = {
  show?: boolean;
  center?: boolean;
};
export const LoadingIndicator: FCWithChildren<LoadingIndicatorProps> = ({
  show = true,
  center = false,
  children,
}) => {
  if (!show) {
    return null;
  }

  return (
    <ColumnFlexBox
      aria-label={'loading indicator'}
      alignItems={center ? 'center' : undefined}
      justifyContent={center ? 'center' : undefined}
      justifyItems={center ? 'space-around' : undefined}
    >
      <CircularProgress />
      {children ? children : null}
    </ColumnFlexBox>
  );
};
