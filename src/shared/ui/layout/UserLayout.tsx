import { useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import React from 'react';
import { toast } from 'sonner';

import { ServerUser } from '@/features/auth/model/User';
import { convertServerUserToUser } from '@/features/auth/model/utils';
import { apiUrl } from '@/features/common/consts';
import userAxios from '@/shared/api/userAxios';
import FullScreenSpinner from '@/shared/ui/FullScreenSpinner';
import Layout from '@/shared/ui/layout/Layout';

const UserLayout: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await userAxios.get<ServerUser>(
          `${apiUrl}/account/users/me`
        );
        const user = convertServerUserToUser(res.data);

        if (res.status === 200) {
          if (!user.nickname?.trim()) {
            toast.error('닉네임을 설정한 후 서비스를 이용할 수 있어요.');
            void navigate({ to: '/settings/account' });
            return;
          }
          setIsAuthorized(true);
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
          toast.error('소셜 로그인에서 문제가 발생했어요.');
          void navigate({ to: '/login' });
          return;
        } else {
          console.error('Unexpected error in getMe', err);
        }
      } finally {
        setLoading(false);
      }
    };

    void checkAuth();
  }, [navigate]);

  if (loading) {
    return <FullScreenSpinner />;
  }

  if (!isAuthorized) {
    return <FullScreenSpinner />;
  }

  return <Layout>{children}</Layout>;
};

export default UserLayout;
