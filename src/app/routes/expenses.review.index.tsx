import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

import { useExpenses } from '@/features/expense/api/useExpenseQuery';
import { Expense } from '@/features/expense/model/types/Expense';
import Period from '@/features/expense/model/types/Period';
import UnReviewedExpenseList from '@/features/expense/ui/UnReviewedExpenseList/UnReviewedExpenseList';
import { useRetrospectives } from '@/features/retrospective/api/useRetrospectives';
import RetrospectiveView from '@/features/retrospective/ui/RetrospectiveView';
import Logo from '@/shared/ui/icons/Logo';
import UserLayout from '@/shared/ui/layout/UserLayout';
import ReviewTopNavBar from '@/widgets/ReviewTopNavBar';

export const Route = createFileRoute('/expenses/review/')({
  component: RouteComponent,
});

function RouteComponent() {
  const period: Period = { year: 2024, month: 4 };
  const { data: expenses } = useExpenses({ period });
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
        <RetrospectiveView />
      ) : (
        <UnReviewedExpenseList expenses={expenses ?? []} />
      )}
    </UserLayout>
  );
}
