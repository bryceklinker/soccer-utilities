import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from '@mui/material/styles';
import { FunctionComponent } from 'react';
import { PaletteType } from '@mui/material';
import { createSoccerTheme } from './create-soccer-theme';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export type SoccerThemeProviderProps = {
  type?: PaletteType;
};

export const SoccerThemeProvider: FunctionComponent<SoccerThemeProviderProps> =
  ({ type = 'dark', children }) => {
    const theme = createSoccerTheme(type);
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </StyledEngineProvider>
    );
  };
