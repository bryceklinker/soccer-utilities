import { Store } from 'redux';
import { render } from '@testing-library/react';
import { FunctionComponent } from 'react';
import { MemoryRouter, MemoryRouterProps, RouterProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTestingStoreFromActions } from './create-testing-store-from-state';
import { RootState } from '../app/state/root-state';
import { SoccerThemeProvider } from '@soccer-utilities/common-ui';

export type RenderWithProvidersOptions = Partial<MemoryRouterProps> &
  Partial<RouterProps> & {
    store?: Store<RootState>;
    currentRoute?: string;
  };

const TestingRouter: FunctionComponent<RenderWithProvidersOptions> = ({
  currentRoute,
  initialEntries,
  initialIndex,
  children,
}) => {
  let entries = ['/'];
  if (initialEntries) {
    entries = initialEntries as string[];
  } else if (currentRoute) {
    entries = [currentRoute];
  }
  return (
    <MemoryRouter initialEntries={entries} initialIndex={initialIndex || 0}>
      {children}
    </MemoryRouter>
  );
};

export function renderWithProviders(
  component: JSX.Element,
  options: RenderWithProvidersOptions = {}
) {
  const store = options.store || createTestingStoreFromActions();
  return render(
    <Provider store={store}>
      <SoccerThemeProvider>
        <TestingRouter {...options}>{component}</TestingRouter>
      </SoccerThemeProvider>
    </Provider>
  );
}
