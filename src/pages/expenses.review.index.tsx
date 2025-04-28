import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

import AuthGuard from '@/features/auth/ui/AuthGuard';
import UnReviewedExpenseView from '@/features/expense/ui/UnReviewedExpenseView';
import RetrospectiveView from '@/features/retrospective/ui/RetrospectiveView';
import Logo from '@/shared/ui/icons/Logo';
import BottomNavBar from '@/widgets/BottomNavBar';
import ReviewTopNavBar from '@/widgets/ReviewTopNavBar';

export const Route = createFileRoute('/expenses/review/')({
  component: () => (
    <AuthGuard>
      <RouteComponent />
    </AuthGuard>
  ),
});

function RouteComponent() {
  const [isRetrospective, setIsRetrospective] = React.useState<boolean>(false);

  return (
    <>
      <header className='px-5 py-4'>
        <Logo />
      </header>
      <ReviewTopNavBar
        isRetrospective={isRetrospective}
        onClickReview={() => {
          setIsRetrospective(false);
        }}
        onClickRetrospective={() => {
          setIsRetrospective(true);
        }}
      />
      {isRetrospective ? (
        <RetrospectiveView />
      ) : (
        <UnReviewedExpenseView
          onMoveRetrospective={() => {
            setIsRetrospective(true);
          }}
        />
      )}
      <BottomNavBar variant={isRetrospective ? 'white' : 'accent'} />
    </>
  );
}
