import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

import { Expense } from '@/features/expense/model/types/Expense';
import UnReviewedExpenseList from '@/features/expense/ui/UnReviewedExpenseList/UnReviewedExpenseList';
import RetrospectiveView from '@/features/retrospective/ui/RetrospectiveView';
import Logo from '@/shared/ui/icons/Logo';
import UserLayout from '@/shared/ui/layout/UserLayout';
import ReviewTopNavBar from '@/widgets/ReviewTopNavBar';

export const Route = createFileRoute('/expenses/review/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isRetrospective, setIsRetrospective] = React.useState<boolean>(false);

  // todo: update useUnReviewedExpenses
  const expenses: Expense[] = [
    {
      uid: 'expense-1',
      date: new Date(),
      memo: '첫번째 소비 백만원',
      amount: 1000000,
      categories: [
        {
          uid: 'category-1',
          name: 'first-category',
        },
      ],
    },
    {
      uid: 'expense-2',
      date: new Date(),
      memo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      amount: 10000,
      categories: [
        {
          uid: 'category-1',
          name: 'first-category',
        },
        {
          uid: 'category-2',
          name: 'second-category',
        },
      ],
    },
  ];

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
        <UnReviewedExpenseList expenses={expenses} />
      )}
    </UserLayout>
  );
}
