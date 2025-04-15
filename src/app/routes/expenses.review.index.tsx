import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

import { useExpenses } from '@/features/expense/api/useExpenseQuery';
import Period from '@/features/expense/model/types/Period';
import UnReviewedExpenseList from '@/features/expense/ui/UnReviewedExpenseList/UnReviewedExpenseList';
import RetrospectiveView from '@/features/retrospective/ui/RetrospectiveView';
import Logo from '@/shared/ui/icons/Logo';
import UserLayout from '@/shared/ui/layout/UserLayout';
import BottomNavBar from '@/widgets/BottomNavBar';
import ReviewTopNavBar from '@/widgets/ReviewTopNavBar';

export const Route = createFileRoute('/expenses/review/')({
  component: RouteComponent,
});

function RouteComponent() {
  const period: Period = { year: 2025, month: 4 };
  const { data: totalExpenses } = useExpenses({ period });
  const { data: unReviewedExpenses } = useExpenses({
    period,
    consumptionKind: 'none',
  });

  const [isRetrospective, setIsRetrospective] = React.useState<boolean>(false);

  if (!totalExpenses) {
    return <></>;
  }

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
        <RetrospectiveView />
      ) : (
        <UnReviewedExpenseList
          unReviewedExpenses={unReviewedExpenses ?? []}
          totalExpenseLength={totalExpenses.length}
          onMoveRetrospective={() => {
            setIsRetrospective(true);
          }}
        />
      )}
      <BottomNavBar />
    </UserLayout>
  );
}
