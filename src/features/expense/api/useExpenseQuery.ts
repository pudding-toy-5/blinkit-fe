import { useMemo } from 'react';

import { createEntityHooks } from '@/features/common/useEntityQuery';

import { DailyExpense, Expense } from '@/features/expense/model/types/Expense';

import { queryKeys } from '../consts';

const fetchExpenses = async (): Promise<Expense[]> => {
  const res = await fetch('./src/features/expense/api/mock-expenses.json');

  if (!res.ok) {
    throw new Error('Failed to fetch expenses');
  }

  console.log(res);
  return res.json() as Promise<Expense[]>;
};

const {
  useEntities: useExpensesQuery,
  useEntityByUid: useExpenseByUid,
  useAddEntity: useAddExpense,
  useUpdateEntity: useUpdateExpense,
  useDeleteEntity: useDeleteExpense,
} = createEntityHooks<Expense>(queryKeys.expenses, fetchExpenses);

const useExpenses = () => {
  const { data = [], isLoading, error } = useExpensesQuery();
  return {
    expenses: data,
    isLoading,
    error,
  };
};

const useDailyExpenses = () => {
  const { expenses, isLoading, error } = useExpenses();

  const dailyExpenses = useMemo(() => {
    const groupedByDate: Record<string, DailyExpense> = {};

    expenses.forEach((expense) => {
      const dateStr = new Date(expense.date).toISOString().split('T')[0];

      groupedByDate[dateStr] = {
        date: new Date(expense.date),
        expenses: [],
      };

      groupedByDate[dateStr].expenses.push(expense);
    });

    return Object.values(groupedByDate).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [expenses]);

  return { dailyExpenses, isLoading, error };
};

const useTotalAmount = () => {
  const { expenses, isLoading, error } = useExpenses();

  const totalAmount = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses]
  );

  return { totalAmount, isLoading, error };
};

export {
  useExpenses,
  useDailyExpenses,
  useExpenseByUid,
  useAddExpense,
  useUpdateExpense,
  useDeleteExpense,
  useTotalAmount,
};
