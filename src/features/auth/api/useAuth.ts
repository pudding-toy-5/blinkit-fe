import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { TOKEN_KEY } from '@/constants';
import { fromUser, toUser } from '@/features/auth/lib/convertUser';
import { ServerUser, User } from '@/features/auth/model/User';
import { apiUrl } from '@/features/common/consts';
import userAxios from '@/shared/api/userAxios';

export const useMe = () => {
  return useQuery<User>({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        const res = await userAxios.get<ServerUser>(
          `${apiUrl}/account/users/me`
        );
        const serverUser = res.data;
        const user = toUser(serverUser);
        return user;
      } catch (error) {
        localStorage.removeItem(TOKEN_KEY);
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
        const res = await userAxios.patch<ServerUser>(
          `${apiUrl}/account/users/me`,
          fromUser(user)
        );
        return toUser(res.data);
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
