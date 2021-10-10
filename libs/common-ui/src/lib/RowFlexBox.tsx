import { FunctionComponent } from 'react';
import { Box, BoxProps } from '@mui/material';

export const RowFlexBox: FunctionComponent<BoxProps> = (props: BoxProps) => {
  return <Box display={'flex'} flex={1} flexDirection={'row'} {...props} />;
};
