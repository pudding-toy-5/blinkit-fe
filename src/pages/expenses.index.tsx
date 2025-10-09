import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';

import AuthGuard from '@/features/auth/ui/AuthGuard';
import {
  useDailyExpensesByYearMonth,
  useTotalAmountByYearMonth,
} from '@/features/expense/api/useExpenseQuery';
import AddExpenseButton from '@/features/expense/ui/AddExpenseButton';
import DailyExpenseList from '@/features/expense/ui/DailyExpenseList';
import Logo from '@/shared/ui/icons/Logo';
import BottomNavBar from '@/widgets/BottomNavBar';
import YearMonthPicker from '@/widgets/YearMonthPicker';

export const Route = createFileRoute('/expenses/')({
  component: () => (
    <AuthGuard>
      <ExpensesPage />
    </AuthGuard>
  ),
});

export function ExpensesPage() {
  const [yearMonth, setYearMonth] = useState<Date>(new Date());

  const { dailyExpenses } = useDailyExpensesByYearMonth({
    year: yearMonth.getFullYear(),
    month: yearMonth.getMonth() + 1,
  });
  const { totalAmount } = useTotalAmountByYearMonth({
    year: yearMonth.getFullYear(),
    month: yearMonth.getMonth() + 1,
  });

  return (
    <>
      <header className='flex flex-row items-center px-5 py-4'>
        <Logo />
      </header>
      <div className='px-5 py-4'>
        <YearMonthPicker value={yearMonth} onChange={setYearMonth} />
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
