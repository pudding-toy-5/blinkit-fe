import axios from 'axios';
import { useMemo } from 'react';

import { apiUrl } from '@/features/common/consts';
import { createEntityHooks } from '@/features/common/useEntityQuery';
import { queryKeys } from '@/features/expense/consts';
import { DailyExpense, Expense } from '@/features/expense/model/types/Expense';

const baseUrl = apiUrl + '/expense/expenses/';

const {
  useEntities: useExpensesQuery,
  useEntityByUid: useExpenseByUid,
  useAddEntity: useAddExpense,
  useUpdateEntity: useUpdateExpense,
  useDeleteEntity: useDeleteExpense,
} = createEntityHooks<Expense>(queryKeys.expenses, baseUrl);

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

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!groupedByDate[dateStr]) {
        groupedByDate[dateStr] = {
          date: new Date(expense.date),
          expenses: [],
        };
      }

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
  useAddExpense,
  useDailyExpenses,
  useDeleteExpense,
  useExpenseByUid,
  useExpenses,
  useTotalAmount,
  useUpdateExpense,
};
