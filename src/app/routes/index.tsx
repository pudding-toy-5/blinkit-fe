import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { useMe } from '@/features/auth/api/useAuth';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data: user, isLoading } = useMe();

  if (isLoading) {
    return;
  }

  if (!user) {
    return;
  }

  if (user.nickname === undefined || user.nickname === '') {
    void navigate({ to: '/settings/account' });
    return;
  }

  // void navigate({ to: '/expenses' });
  return;
}
