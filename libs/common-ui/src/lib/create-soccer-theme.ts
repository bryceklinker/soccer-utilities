import { Theme, PaletteType, createTheme } from '@material-ui/core';
import { blue, yellow } from '@material-ui/core/colors';

export function createSoccerTheme(type: PaletteType = 'dark'): Theme {
  return createTheme({
    palette: {
      type,
      primary: blue,
      secondary: yellow
    }
  })
}
