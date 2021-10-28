import { FunctionComponent } from 'react';
import { IconButton, IconButtonProps } from '@mui/material';

export interface HideableIconButtonProps extends IconButtonProps {
  show: boolean;
}

export const HideableIconButton: FunctionComponent<HideableIconButtonProps> = ({
  show,
  ...props
}) => {
  if (!show) {
    return null;
  }

  return <IconButton {...props} />;
};
