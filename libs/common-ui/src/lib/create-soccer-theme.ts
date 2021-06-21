import { createMuiTheme, Theme, PaletteType } from '@material-ui/core';
import { blue, yellow } from '@material-ui/core/colors';

export function createSoccerTheme(type: PaletteType = 'dark'): Theme {
  return createMuiTheme({
    palette: {
      type,
      primary: blue,
      secondary: yellow
    }
  })
}
