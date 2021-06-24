import { ColumnFlexBox, LoadingIndicator } from '@soccer-utilities/common-ui';
import { Box, Typography } from '@material-ui/core';

export function ShellLoading() {
  return (
    <ColumnFlexBox
      alignItems={'center'}
      justifyContent={'center'}
      justifyItems={'space-around'}>
      <LoadingIndicator />
      <Typography variant={'h4'}>Preparing Your Application...</Typography>
    </ColumnFlexBox>
  );
}
