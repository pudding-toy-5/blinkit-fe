import { createFileRoute } from '@tanstack/react-router';

import AuthGuard from '@/features/auth/ui/AuthGuard';
import RetrospectiveView from '@/features/retrospective/ui/RetrospectiveView';
import Logo from '@/shared/ui/icons/Logo';
import BottomNavBar from '@/widgets/BottomNavBar';

export const Route = createFileRoute('/expenses/retrospective/')({
  component: () => (
    <AuthGuard>
      <RouteComponent />
    </AuthGuard>
  ),
});

function RouteComponent() {
  return (
    <>
      <header className='px-5 py-4'>
        <Logo />
      </header>
      <RetrospectiveView />
      <BottomNavBar variant='white' />
    </>
  );
}
