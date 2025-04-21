import { useLocation, useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import React from 'react';

import { ServerUser } from '@/features/auth/model/User';
import { convertServerUserToUser } from '@/features/auth/model/utils';
import { apiUrl } from '@/features/common/consts';
import userAxios from '@/shared/api/userAxios';
import FullScreenSpinner from '@/shared/ui/FullScreenSpinner';

const ProtectedRoute: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
          if (
            location.pathname !== '/settings/account' &&
            !user.nickname?.trim()
          ) {
            void navigate({ to: '/settings/account' });
            return;
          }
          setIsAuthorized(true);
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
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

  return <>{children}</>;
};

export default ProtectedRoute;
