import { render, screen } from '@testing-library/react';
import { SettingsProvider, useSettings } from '@soccer-utilities/settings-ui';
import { SettingsServer } from '../testing';

describe('SettingsProvider', () => {
  beforeEach(() => {
    SettingsServer.setupSettings({
      api: {
        url: 'https://localhost:3333'
      },
      auth: {
        audience: 'https://prod.soccer.com',
        domain: 'auth0.domain.com'
      }
    })
  })

  test('when rendered then shows loading while settings are loaded', () => {
    render(<SettingsProvider>
        <TestingComponent />
      </SettingsProvider>
    );

    expect(screen.getByLabelText('loading indicator')).toBeInTheDocument();
  });

  test('when rendered then shows children when settings are loaded', async () => {

    render(<SettingsProvider>
      <TestingComponent />
    </SettingsProvider>);

    expect(await screen.findByLabelText('settings')).toHaveTextContent('https://localhost:3333');
  });
});

function TestingComponent() {
  const settings = useSettings();
  return (
    <>
      <div aria-label={'settings'}>
        {JSON.stringify(settings)}
      </div>
    </>
  );
}
