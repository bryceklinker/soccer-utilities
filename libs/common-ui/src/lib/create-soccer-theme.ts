import { Theme, PaletteMode, createTheme } from '@mui/material';
import { blue, yellow } from '@mui/material/colors';
import '@mui/styles';

declare module '@mui/styles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export function createSoccerTheme(mode: PaletteMode = 'dark'): Theme {
  return createTheme({
    palette: {
      mode,
      primary: blue,
      secondary: yellow,
    },
  });
}
