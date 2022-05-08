import { Box, BoxProps } from '@mui/material';
import { FCWithChildren } from './with-children';

export const ColumnFlexBox: FCWithChildren<BoxProps> = (props) => {
  return <Box display={'flex'} flex={1} flexDirection={'column'} {...props} />;
};
