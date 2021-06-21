import { FunctionComponent } from 'react';
import { CircularProgress } from '@material-ui/core';

type LoadingIndicatorProps = {
  show?: boolean;
}
export const LoadingIndicator: FunctionComponent<LoadingIndicatorProps> = ({show = true}: LoadingIndicatorProps) => {
  if (!show) {
    return null;
  }

  return <CircularProgress aria-label={'loading indicator'} />
}
