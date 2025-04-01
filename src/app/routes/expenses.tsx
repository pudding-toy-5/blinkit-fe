import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  useDailyExpenses,
  useTotalAmount,
} from '@/features/expense/api/useExpenseQuery';
import Period from '@/features/expense/model/types/Period';
import DailyExpenseList from '@/features/expense/ui/DailyExpenseList';
import MonthSelector from '@/features/expense/ui/MonthSelector';
import Logo from '@/shared/ui/icons/Logo';
import Setting from '@/shared/ui/icons/Setting';
import Layout from '@/shared/ui/layout/Layout';

export const Route = createFileRoute('/expenses')({
  component: ExpensesPage,
});

export function ExpensesPage() {
  // month Selector
  const current = new Date();
  const [period, setPeriod] = React.useState<Period>({
    year: current.getFullYear(),
    month: current.getMonth() + 1,
  });

  // scroll event
  const [hideDivs, setHideDivs] = React.useState<boolean>(false);
  const [prevScrollTop, setPrevScrollTop] = React.useState<number>(0);

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const currentScrollTop = e.currentTarget.scrollTop;
    if (currentScrollTop > prevScrollTop) {
      setHideDivs(true);
    } else {
      setHideDivs(false);
    }

    setPrevScrollTop(currentScrollTop);
  };

  // api hooks
  const { dailyExpenses } = useDailyExpenses();
  const { totalAmount } = useTotalAmount();

  return (
    <Layout>
      {!hideDivs && (
        <header className='flex flex-row items-center px-5 py-4'>
          <Logo />
          <Button variant='ghost' className='ml-auto size-6'>
            <Setting size={24} />
          </Button>
        </header>
      )}
      <div className='px-5 py-4'>
        {!hideDivs && <h1 className='text-[22px] font-semibold mb-4'>기록</h1>}
        <MonthSelector period={period} onSetPeriod={setPeriod} />
        <div className='flex flex-col mt-4'>
          <p className='text-[15px] text-[#555] font-semibold'>총 소비 내역</p>
          <p className='text-[22px] text-[#222] font-semibold mt-1'>
            {totalAmount.toLocaleString('ko-KR')}원
          </p>
        </div>
      </div>
      <DailyExpenseList dailyExpenses={dailyExpenses} onScroll={handleScroll} />
    </Layout>
  );
}

export default ExpensesPage;
