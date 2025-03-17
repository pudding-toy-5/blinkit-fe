import { createFileRoute } from '@tanstack/react-router';

import Layout from '@/shared/ui/layout/Layout';
import Logo from '@/shared/ui/icons/Logo';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import MonthSelector from '@/features/expense/ui/MonthSelector';
import DailyExpenseList from '@/features/expense/ui/DailyExpenseList';

import { useExpenseStore } from '@/features/expense/model/expenseStore';
import { DailyExpense } from '@/features/expense/model/types';

export const Route = createFileRoute('/expenses')({
  component: ExpensesPage,
});

export function ExpensesPage() {
  const dailyExpenses: DailyExpense[] = useExpenseStore(
    (state) => state.dailyExpenses
  );

  return (
    <Layout>
      <header className='flex flex-row items-center px-5 py-4'>
        <Logo />
        <Button variant='ghost' className='ml-auto' size='icon'>
          <Settings className='!size-6' />
        </Button>
      </header>
      <main className='flex flex-col h-full'>
        <div className='px-5 py-4'>
          <h1 className='text-[22px] mb-4'>기록</h1>
          <MonthSelector />
        </div>
        <DailyExpenseList dailyExpenses={dailyExpenses} />
      </main>
    </Layout>
  );
}

export default ExpensesPage;
