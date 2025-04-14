import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

import Logo from '@/shared/ui/icons/Logo';
import UserLayout from '@/shared/ui/layout/UserLayout';
import ReviewTopNavBar from '@/widgets/ReviewTopNavBar';

export const Route = createFileRoute('/expenses/review/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isRewind, setIsRewind] = React.useState<boolean>(false);

  return (
    <UserLayout>
      <header className='px-5 py-4'>
        <Logo />
      </header>
      <ReviewTopNavBar isRewind={isRewind} setIsRewind={setIsRewind} />
    </UserLayout>
  );
}
