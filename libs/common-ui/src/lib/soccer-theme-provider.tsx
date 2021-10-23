import { ThemeProvider } from '@mui/material/styles';
import { FunctionComponent } from 'react';
import { CssBaseline, PaletteMode } from '@mui/material';
import { createSoccerTheme } from './create-soccer-theme';
import { StylesProvider } from '@mui/styles';

export type SoccerThemeProviderProps = {
  type?: PaletteMode;
};

export const SoccerThemeProvider: FunctionComponent<SoccerThemeProviderProps> =
  ({ type = 'dark', children }) => {
    const theme = createSoccerTheme(type);
    return (
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <>
            <CssBaseline />
            {children}
          </>
        </ThemeProvider>
      </StylesProvider>
    );
  };
