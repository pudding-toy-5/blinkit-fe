import { createFileRoute, Link } from '@tanstack/react-router';
import React from 'react';

import AuthGuard from '@/features/auth/ui/AuthGuard';
import {
  useDailyExpensesByPeriod,
  useTotalAmountByPeriod,
} from '@/features/expense/api/useExpenseQuery';
import Period from '@/features/expense/model/Period';
import AddExpenseButton from '@/features/expense/ui/AddExpenseButton';
import DailyExpenseList from '@/features/expense/ui/DailyExpenseList';
import MonthSelector from '@/features/expense/ui/MonthSelector';
import Logo from '@/shared/ui/icons/Logo';
import BottomNavBar from '@/widgets/BottomNavBar';

export const Route = createFileRoute('/expenses/')({
  component: () => (
    <AuthGuard>
      <ExpensesPage />
    </AuthGuard>
  ),
});

export function ExpensesPage() {
  // month Selector
  const current = new Date();
  const [period, setPeriod] = React.useState<Period>({
    year: current.getFullYear(),
    month: current.getMonth() + 1,
  });

  // scroll event
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);
  const [prevScrollTop, setPrevScrollTop] = React.useState<number>(0);

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const currentScrollTop = e.currentTarget.scrollTop;
    if (currentScrollTop > prevScrollTop) {
      // setIsCollapsed(true);
      setIsCollapsed(false);
    } else {
      // setIsCollapsed(false);
      setIsCollapsed(false);
    }

    setPrevScrollTop(currentScrollTop);
  };

  // api hooks
  const { dailyExpenses } = useDailyExpensesByPeriod(period);
  const { totalAmount } = useTotalAmountByPeriod(period);

  return (
    <>
      {!isCollapsed && (
        <header className='flex flex-row items-center px-5 py-4'>
          <Logo />
        </header>
      )}
      <div className='px-5 py-4'>
        {!isCollapsed && (
          <h1 className='text-[22px] font-semibold mb-4'>기록</h1>
        )}
        <MonthSelector period={period} onSetPeriod={setPeriod} />
        <div className='flex flex-col mt-4'>
          <span className='text-[15px] text-[#555] font-semibold'>
            총 소비 내역
          </span>
          <span className='text-[22px] text-[#222] font-semibold mt-1 h-[26px]'>
            {totalAmount.toLocaleString('ko-KR')}원
          </span>
        </div>
      </div>
      <DailyExpenseList dailyExpenses={dailyExpenses} onScroll={handleScroll} />
      <BottomNavBar variant='accent' />
      <Link to='/expenses/new'>
        <AddExpenseButton />
      </Link>
    </>
  );
}

export default ExpensesPage;
