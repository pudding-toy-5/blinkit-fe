import { createFileRoute, redirect } from '@tanstack/react-router';

import { ServerUser } from '@/features/auth/model/User';
import { convertServerUserToUser } from '@/features/auth/model/utils';
import { apiUrl } from '@/features/common/consts';
import userAxios from '@/shared/api/userAxios';

export const Route = createFileRoute('/')({
  loader: async () => {
    try {
      const res = await userAxios.get<ServerUser>(`${apiUrl}/account/users/me`);
      const user = convertServerUserToUser(res.data);

      if (!user.nickname) {
        return redirect({ to: '/settings/account' });
      }

      if (user.nickname.length > 0) {
        return redirect({ to: '/expenses' });
      }
    } catch {
      return redirect({ to: '/login' });
    }
  },
});
