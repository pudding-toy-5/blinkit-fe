import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { ServerUser, User } from '@/features/auth/model/User';
import {
  convertServerUserToUser,
  convertUserToServerUser,
} from '@/features/auth/model/utils';
import { apiUrl } from '@/features/common/consts';
import userAxios from '@/shared/api/userAxios';

export const useMe = () => {
  const navigate = useNavigate();
  return useQuery<User>({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        const res = await userAxios.get(`${apiUrl}/account/users/me`);
        const serverUser = res.data as ServerUser;
        const user = convertServerUserToUser(serverUser);
        return user;
      } catch (error) {
        toast.error('소셜 로그인에서 문제가 발생했어요.');
        void navigate({ to: '/login' });

        if (error instanceof AxiosError) {
          throw new Error('Get Me Failed: ' + error.message);
        }
        throw error;
      }
    },
  });
};

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: User): Promise<User> => {
      try {
        const res = await userAxios.patch(
          `${apiUrl}/account/users/me`,
          convertUserToServerUser(user)
        );
        return convertServerUserToUser(res.data as ServerUser);
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error('useUpdateMe failed: ' + error.message);
        }
        throw error;
      }
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['me'], () => {
        return updatedUser;
      });
    },
    onError: (error) => {
      console.error('failed on useUpdateExpense: ', error);
    },
  });
};
