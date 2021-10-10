import { FunctionComponent } from 'react';
import { Box, Typography } from '@mui/material';

export const WelcomePage: FunctionComponent = () => {
  return (
    <Box
      flex={1}
      display={'flex'}
      flexDirection={'column'}
      aria-label={'welcome message'}
    >
      <Typography variant={'h3'}>Welcome to Soccer Utilities</Typography>
    </Box>
  );
};
