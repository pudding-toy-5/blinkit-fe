import { useState } from 'react';

import { Button } from '@/shared/ui/atoms/button';
import { TOKEN_KEY } from '@/constants';
import { cn } from '@/shared/ui/styles/utils';

import { Google, Naver } from './Icons';

interface SocialAuthProps {
  service: 'google' | 'naver';
  onClick?: () => void;
}

export default function SocialAuth({ service, onClick }: SocialAuthProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiHost = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    onClick?.();

    try {
      const currentUrl = new URL(window.location.href);
      const redirectUri = `${currentUrl.origin}${currentUrl.pathname}/${service}`;

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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          errorData.detail ||
            `Authorization failed: ${response.status.toString()}`
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
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
        <div className='flex flex-col items-center gap-3 p-4 border rounded-[8px] shadow-sm'>
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
          <Button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleLogin}
            className={cn(
              'flex h-12 w-full items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 transition-colors rounded-[8px]',
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
