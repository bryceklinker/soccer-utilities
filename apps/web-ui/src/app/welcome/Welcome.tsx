import { FunctionComponent } from 'react';
import { Box, Typography } from '@material-ui/core';

export const WelcomePage: FunctionComponent = () => {
  return (
    <Box flex={1} display={'flex'} flexDirection={'column'} aria-label={'welcome message'}>
      <Typography variant={'h3'}>Welcome to Soccer Utilties</Typography>
    </Box>
  )
}
