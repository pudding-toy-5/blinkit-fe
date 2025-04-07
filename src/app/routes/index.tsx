import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  void navigate({ to: '/expenses' });
  return;
}
