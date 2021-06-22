import { LoadingIndicator } from '@soccer-utilities/common-ui';
import { Box, Typography } from '@material-ui/core';

export function ShellLoading() {
  return (
    <Box display={'flex'}
         flex={1}
         flexDirection={'column'}
         alignItems={'center'}
         justifyContent={'center'}
        justifyItems={'space-around'}>
      <LoadingIndicator />
      <Typography variant={'h4'}>Preparing Your Application...</Typography>
    </Box>
  );
}
