import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

import { Expense } from '@/features/expense/model/types/Expense';
import UnReviewedExpenseList from '@/features/expense/ui/UnReviewedExpenseList/UnReviewedExpenseList';
import Logo from '@/shared/ui/icons/Logo';
import UserLayout from '@/shared/ui/layout/UserLayout';
import ReviewTopNavBar from '@/widgets/ReviewTopNavBar';

export const Route = createFileRoute('/expenses/review/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isRewind, setIsRewind] = React.useState<boolean>(false);

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
      memo: '엄청나게 긴 메모',
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
      <ReviewTopNavBar isRewind={isRewind} setIsRewind={setIsRewind} />
      <UnReviewedExpenseList expenses={expenses} />
    </UserLayout>
  );
}
