import { FunctionComponent } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { ColumnFlexBox } from './ColumnFlexBox';

type LoadingIndicatorProps = {
  show?: boolean;
  center?: boolean;
};
export const LoadingIndicator: FunctionComponent<LoadingIndicatorProps> = ({
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
