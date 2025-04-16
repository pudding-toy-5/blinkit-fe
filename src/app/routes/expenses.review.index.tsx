import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

import UnReviewedExpenseView from '@/features/expense/ui/UnReviewedExpenseView';
import RetrospectiveView from '@/features/retrospective/ui/RetrospectiveView';
import Logo from '@/shared/ui/icons/Logo';
import UserLayout from '@/shared/ui/layout/UserLayout';
import BottomNavBar from '@/widgets/BottomNavBar';
import ReviewTopNavBar from '@/widgets/ReviewTopNavBar';

export const Route = createFileRoute('/expenses/review/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isRetrospective, setIsRetrospective] = React.useState<boolean>(false);

  return (
    <UserLayout>
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
        <RetrospectiveView
          onMoveReview={() => {
            setIsRetrospective(false);
          }}
        />
      ) : (
        <UnReviewedExpenseView
          onMoveRetrospective={() => {
            setIsRetrospective(true);
          }}
        />
      )}
      <BottomNavBar variant='white' />
    </UserLayout>
  );
}
