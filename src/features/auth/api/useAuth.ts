import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ServerUser, User } from '@/features/auth/model/User';
import { convertServerUserToUser } from '@/features/auth/model/utils';
import { apiUrl } from '@/features/common/consts';
import userAxios from '@/shared/api/userAxios';

export const useGetMe = () => {
  return useQuery<User>({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        const res = await userAxios.get(`${apiUrl}/account/users/me`);
        const serverUser = res.data as ServerUser;
        const user = convertServerUserToUser(serverUser);
        return user;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error('Get Me Failed: ' + error.message);
        }
        throw error;
      }
    },
  });
};

// export const useUpdateMe = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async,
//   });
// };
