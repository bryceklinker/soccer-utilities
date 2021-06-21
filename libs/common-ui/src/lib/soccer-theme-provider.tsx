import {ThemeProvider} from '@material-ui/core/styles'
import { FunctionComponent, useState } from 'react';
import { PaletteType } from '@material-ui/core';
import { createSoccerTheme } from './create-soccer-theme';

export type SoccerThemeProviderProps = {
  type?: PaletteType;
}

export const SoccerThemeProvider: FunctionComponent<SoccerThemeProviderProps> = ({type = 'dark', children}) => {
  const theme = createSoccerTheme(type);
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
