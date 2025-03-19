import { createEntityHooks } from '@/features/common/useEntityQuery';

import useExpenseStore from '@/features/expense/model/useExpenseStore';
import { Expense } from '@/features/expense/model/types/Expense';

import { queryKeys } from '../consts';

const fetchExpenses = async (): Promise<Expense[]> => {
  const res = await fetch('./mock-expenses.json');

  if (!res.ok) {
    throw new Error('Failed to fetch expenses');
  }

  return res.json() as Promise<Expense[]>;
};

const setExpenses = useExpenseStore((store) => store.setExpenses);

const {
  useFetchEntities: useFetchExpenses,
  useAddEntity: useAddExpense,
  useUpdateEntity: useUpdateExpense,
  useDeleteEntity: useDeleteExpense,
} = createEntityHooks<Expense>(queryKeys.expenses, fetchExpenses, setExpenses);

export { useFetchExpenses, useAddExpense, useUpdateExpense, useDeleteExpense };
