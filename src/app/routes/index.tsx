import { createFileRoute, redirect } from '@tanstack/react-router';
import { toast } from 'sonner';

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
        toast.error('닉네임을 설정한 후 서비스를 사용할 수 있어요.');
        return redirect({ to: '/settings/account' });
      }

      if (user.nickname === '') {
        toast.error('닉네임을 설정한 후 서비스를 사용할 수 있어요.');
        return redirect({ to: '/settings/account' });
      }

      return redirect({ to: '/expenses' });
    } catch {
      toast.error('소셜 로그인에서 문제가 발생했어요.');
      return redirect({ to: '/login' });
    }
  },
});
