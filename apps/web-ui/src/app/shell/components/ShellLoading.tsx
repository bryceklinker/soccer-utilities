import { LoadingIndicator } from '@soccer-utilities/common-ui';
import { Box } from '@material-ui/core';

export function ShellLoading() {
  return (
    <Box display={'flex'} flex={1} flexDirection={'column'}>
      <LoadingIndicator />
    </Box>
  );
}
