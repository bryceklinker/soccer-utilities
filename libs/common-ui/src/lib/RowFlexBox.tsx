import { Box, BoxProps } from '@mui/material';
import { FCWithChildren } from './with-children';

export const RowFlexBox: FCWithChildren<BoxProps> = (props: BoxProps) => {
  return <Box display={'flex'} flex={1} flexDirection={'row'} {...props} />;
};
