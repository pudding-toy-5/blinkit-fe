import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { useMe } from '@/features/auth/api/useAuth';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data: user, isError } = useMe();

  if (isError) {
    void navigate({ to: '/login' });
    return;
  }

  if (user === undefined) {
    return;
  }

  if (user.nickname === undefined) {
    void navigate({ to: '/settings/account' });
    return;
  }

  if (user.nickname.length > 0) {
    void navigate({ to: '/expenses' });
    return;
  }
}
