import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, PaletteMode } from '@mui/material';
import { createSoccerTheme } from './create-soccer-theme';
import { StylesProvider } from '@mui/styles';
import { FCWithChildren } from './with-children';

export type SoccerThemeProviderProps = {
  type?: PaletteMode;
};

export const SoccerThemeProvider: FCWithChildren<SoccerThemeProviderProps> = ({
  type = 'dark',
  children,
}) => {
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
