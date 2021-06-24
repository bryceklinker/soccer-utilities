import { Store } from 'redux';
import { render } from '@testing-library/react';
import { FunctionComponent } from 'react';
import { Router, MemoryRouter, MemoryRouterProps, RouterProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTestingStore } from './create-testing-store';
import { RootState } from '../app/state';

export type RenderWithProvidersOptions =
  Partial<MemoryRouterProps>
  & Partial<RouterProps>
  & {
  store?: Store<RootState>;
  currentRoute?: string;
}

const TestingRouter: FunctionComponent<RenderWithProvidersOptions> = ({
                                                                        currentRoute,
                                                                        initialEntries,
                                                                        initialIndex,
                                                                        history,
                                                                        children
                                                                      }) => {
  if (history) {
    return (
      <Router history={history}>
        {children}
      </Router>
    );
  }

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

export function renderWithProviders(component: JSX.Element, options: RenderWithProvidersOptions = {}) {
  const store = options.store || createTestingStore();
  return render(
    <Provider store={store}>
      <TestingRouter {...options}>
        {component}
      </TestingRouter>
    </Provider>
  );
}
