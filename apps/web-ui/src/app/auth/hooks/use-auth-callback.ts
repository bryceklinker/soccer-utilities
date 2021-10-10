import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

export function useAuthCallback(isCypress: boolean) {
  const { isLoading, user, handleRedirectCallback, loginWithRedirect } =
    useAuth0();
  useEffect(() => {
    if (isLoading || user) {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('code')) {
      handleRedirectCallback().catch((err) => console.error(err));
    } else if (!isCypress) {
      loginWithRedirect().catch((err) => console.error(err));
    }
  }, [isLoading, user, handleRedirectCallback, loginWithRedirect, isCypress]);
}
