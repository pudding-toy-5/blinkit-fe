import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { useMe } from '@/features/auth/api/useAuth';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data: user } = useMe();

  if (user?.nickname === '') {
    void navigate({ to: '/settings/account' });
    return;
  }

  void navigate({ to: '/expenses' });
  return;
}
