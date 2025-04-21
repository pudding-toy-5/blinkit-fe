import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

import { TOKEN_KEY } from '@/constants';

interface AuthResponse {
  access_token: string;
  token_type: string;
  user: any;
}

export const Route = createFileRoute('/login/$service/')({
  component: RouteComponent,
});

const apiHost = import.meta.env.VITE_API_URL;

function RouteComponent() {
  const { service }: { service: string } = Route.useParams();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (code && state) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      handleCallback(code, state);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCallback = async (code: string, state: string) => {
    try {
      window.history.replaceState({}, document.title, window.location.pathname);

      const currentUrl = new URL(window.location.href);
      const redirectUri = `${currentUrl.origin}${currentUrl.pathname}`;

      const callbackUrl = `${apiHost}/auth/sso/${service}/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

      const response = await fetch(callbackUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          errorData.detail ||
            `Authentication failed: ${response.status.toString()}`
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const authData: AuthResponse = await response.json();

      localStorage.setItem(TOKEN_KEY, authData.access_token);

      // Initialize the last API call timestamp
      localStorage.setItem('last-api-call-timestamp', Date.now().toString());

      console.log('Authentication successful');

      window.location.href = '/';
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };
  return <>로그인 중</>;
}
