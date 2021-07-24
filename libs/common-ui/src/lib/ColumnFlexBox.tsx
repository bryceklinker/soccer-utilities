import { FunctionComponent } from 'react';
import { Box, BoxProps } from '@material-ui/core';

export const ColumnFlexBox: FunctionComponent<BoxProps> = (props) => {
  return <Box display={'flex'} flex={1} flexDirection={'column'} {...props} />;
};
