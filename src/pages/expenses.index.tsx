import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';

import AuthGuard from '@/features/auth/ui/AuthGuard';
import {
  useDailyExpensesByPeriod,
  useTotalAmountByPeriod,
} from '@/features/expense/api/useExpenseQuery';
import AddExpenseButton from '@/features/expense/ui/AddExpenseButton';
import DailyExpenseList from '@/features/expense/ui/DailyExpenseList';
import MonthSelector from '@/features/expense/ui/MonthSelector';
import YearMonth from '@/shared/model/YearMonth';
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
  const current = new Date();
  const [yearMonth, setYearMonth] = useState<YearMonth>({
    year: current.getFullYear(),
    month: current.getMonth() + 1,
  });

  const { dailyExpenses } = useDailyExpensesByPeriod(yearMonth);
  const { totalAmount } = useTotalAmountByPeriod(yearMonth);

  return (
    <>
      <header className='flex flex-row items-center px-5 py-4'>
        <Logo />
      </header>
      <div className='px-5 py-4'>
        <MonthSelector yearMonth={yearMonth} onSetYearMonth={setYearMonth} />
        <div className='flex flex-col mt-4'>
          <span className='text-[15px] text-[#555] font-semibold'>
            총 소비 내역
          </span>
          <span className='text-[22px] text-[#222] font-semibold mt-1 h-[26px]'>
            {totalAmount.toLocaleString('ko-KR')}원
          </span>
        </div>
      </div>
      <DailyExpenseList dailyExpenses={dailyExpenses} />
      <BottomNavBar variant='accent' />
      <Link to='/expenses/new'>
        <AddExpenseButton />
      </Link>
    </>
  );
}

export default ExpensesPage;
