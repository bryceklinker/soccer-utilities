import { IconButton, IconButtonProps } from '@mui/material';
import { FCWithChildren } from './with-children';

export interface HideableIconButtonProps extends IconButtonProps {
  show: boolean;
}

export const HideableIconButton: FCWithChildren<HideableIconButtonProps> = ({
  show,
  ...props
}) => {
  if (!show) {
    return null;
  }

  return <IconButton {...props} />;
};
