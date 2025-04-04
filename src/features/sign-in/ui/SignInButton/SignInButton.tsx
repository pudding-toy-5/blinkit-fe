import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { TOKEN_KEY } from '@/constants';
import { cn } from '@/shared/ui/styles/utils';

import { Google, Naver } from './Icons';

interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
  };
}

interface SocialAuthProps {
  service: 'google' | 'naver';
  onClick?: () => void;
}

export function SocialAuth({ service, onClick }: SocialAuthProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isProcessingCallback = useRef(false);

  const apiHost = import.meta.env.VITE_API_HOST;

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (code && state && !isProcessingCallback.current) {
      isProcessingCallback.current = true;
      handleCallback(code, state);
    }
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    onClick?.();

    try {
      const currentUrl = new URL(window.location.href);
      const redirectUri = `${currentUrl.origin}${currentUrl.pathname}`;

      const response = await fetch(
        `${apiHost}/auth/sso/${service}/authorize?redirect_uri=${encodeURIComponent(redirectUri)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `Authorization failed: ${response.status}`
        );
      }

      const data = await response.json();

      window.location.href = data.authorization_url;
    } catch (error) {
      console.error('Authorization error:', error);
      setError(
        error instanceof Error ? error.message : 'Unknown authorization error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCallback = async (code: string, state: string) => {
    setIsLoading(true);
    setError(null);

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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `Authentication failed: ${response.status}`
        );
      }

      const authData: AuthResponse = await response.json();

      localStorage.setItem(TOKEN_KEY, authData.access_token);

      // Initialize the last API call timestamp
      localStorage.setItem('last-api-call-timestamp', Date.now().toString());

      console.log('Authentication successful');

      window.location.href = '/';
    } catch (error) {
      console.error('Authentication error:', error);
      setError(
        error instanceof Error ? error.message : 'Unknown authentication error'
      );
    } finally {
      setIsLoading(false);
      isProcessingCallback.current = false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    console.log('Logged out successfully');
    window.location.href = '/login';
  };

  const isLoggedIn = !!localStorage.getItem(TOKEN_KEY);

  return (
    <div className='flex flex-col gap-4 items-center'>
      {error && (
        <div
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
          role='alert'
        >
          <span className='block sm:inline'>{error}</span>
        </div>
      )}

      {isLoading && (
        <div className='text-center py-4'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto'></div>
          <p className='mt-2 text-gray-600'>처리 중...</p>
        </div>
      )}

      {isLoggedIn ? (
        <div className='flex flex-col items-center gap-3 p-4 border rounded-lg shadow-sm'>
          <div className='text-center'>
            <h3 className='font-medium'>로그인됨</h3>
          </div>
          <button
            onClick={handleLogout}
            className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors'
          >
            로그아웃
          </button>
        </div>
      ) : (
        !isLoading && (
          <div className='flex flex-col gap-4'>
            <div className='text-center'>
              <Button
                onClick={handleLogin}
                className={cn(
                  'flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors',
                  service === 'google' &&
                    'bg-white text-[#222] text-[15px] border-[#ccc] hover:bg-white/90',
                  service === 'naver' &&
                    'bg-[#03C75A] text-white text-[15px] border-none hover:bg-[#03C75A]/90'
                )}
                disabled={isLoading}
              >
                {service === 'google' && <Google />}
                {service === 'naver' && <Naver />}
                {getServiceText(service)} 계정으로 시작하기
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

const getServiceText = (service: string) => {
  switch (service) {
    case 'google':
      return '구글';
    case 'naver':
      return '네이버';
    default:
      throw new Error();
  }
};
