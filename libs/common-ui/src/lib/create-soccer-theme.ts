import { Theme, PaletteType, createTheme, adaptV4Theme } from '@mui/material';
import { blue, yellow } from '@mui/material/colors';

export function createSoccerTheme(type: PaletteType = 'dark'): Theme {
  return createTheme(
    adaptV4Theme({
      palette: {
        mode,
        primary: blue,
        secondary: yellow,
      },
    })
  );
}
