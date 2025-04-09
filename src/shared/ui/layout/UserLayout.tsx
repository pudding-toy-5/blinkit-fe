import { useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import React from 'react';
import { toast } from 'sonner';

import { ServerUser } from '@/features/auth/model/User';
import { convertServerUserToUser } from '@/features/auth/model/utils';
import { apiUrl } from '@/features/common/consts';
import userAxios from '@/shared/api/userAxios';

import FullScreenSpinner from '../FullScreenSpinner';

const Layout: React.FC<{
  children?: React.ReactNode;
  isLoading?: boolean;
  guarded?: boolean;
}> = ({ children, isLoading = false, guarded = false }) => {
  const navigate = useNavigate();

  const hasRedirectedRef = React.useRef<boolean>(false);

  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(!!guarded);

  React.useEffect(() => {
    if (!guarded) return;

    const checkAuth = async () => {
      try {
        const res = await userAxios.get<ServerUser>(
          `${apiUrl}/account/users/me`
        );
        const user = convertServerUserToUser(res.data);

        if (res.status === 200) {
          if (!user.nickname?.trim()) {
            if (!hasRedirectedRef.current) {
              hasRedirectedRef.current = true;
              toast.error('닉네임을 설정한 후 서비스를 이용할 수 있어요.');
              void navigate({ to: '/settings/account' });
            }
            return;
          }
          setIsAuthorized(true);
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401 && !hasRedirectedRef.current) {
          hasRedirectedRef.current = true;
          toast.error('소셜 로그인에서 문제가 발생했어요.');
          void navigate({ to: '/login' });
        } else {
          console.error('Unexpected error in getMe', err);
        }
      } finally {
        setLoading(false);
      }
    };

    void checkAuth();
  }, [guarded, navigate]);

  if (guarded) {
    if (loading || isLoading) {
      return <FullScreenSpinner />;
    }

    if (!isAuthorized) {
      return <FullScreenSpinner />;
    }

    if (!hasRedirectedRef.current) {
      return <FullScreenSpinner />;
    }
  }

  return (
    <div className='w-full min-w-[375px] max-w-[430px] mx-auto h-screen bg-white relative flex flex-col overflow-hidden safe-area-wrapper'>
      {children}
    </div>
  );
};

export default Layout;
