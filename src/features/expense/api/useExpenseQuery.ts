import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import useExpenseStore from '@/features/expense/model/useExpenseStore';
import { Expense } from '@/features/expense/model/types/Expense';

import { queryKeys } from '../consts';
import fakeApiCall from './fakeApiCall';

const fetchExpenses = async (): Promise<Expense[]> => {
  const res = await fetch('./mock-expenses.json');

  if (!res.ok) {
    throw new Error('Failed to fetch expenses');
  }

  return res.json() as Promise<Expense[]>;
};

const addExpense = async (expense: Omit<Expense, 'id'>) => {
  return await fakeApiCall<Expense>({
    id: new Date().toString(),
    ...expense,
  });
};

const updateExpense = async (expense: Expense) => {
  return await fakeApiCall<Expense>(expense);
};

const deleteExpense = async (id: string) => {
  return await fakeApiCall<string>(id);
};

export const useFetchExpenses = () => {
  const setExpenses = useExpenseStore((state) => state.setExpenses);
  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys.expenses],
    queryFn: fetchExpenses,
  });

  useEffect(() => {
    if (data) {
      setExpenses(data);
    }
  }, [data, setExpenses]);

  return { data, error, isLoading };
};

export const useAddExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addExpense,
    onSuccess: (newExpense) => {
      queryClient.setQueryData(
        queryKeys.expenses,
        (oldData: Expense[] | undefined) => {
          return oldData ? [...oldData, newExpense] : [newExpense];
        }
      );
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExpense,
    onSuccess: (updatedExpense) => {
      queryClient.setQueryData(
        queryKeys.expenses,
        (oldData: Expense[] | undefined) => {
          return oldData?.map((expense) =>
            expense.id === updatedExpense.id ? updatedExpense : expense
          );
        }
      );
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: (id) => {
      queryClient.setQueryData(
        queryKeys.expenses,
        (oldData: Expense[] | undefined) => {
          return oldData?.filter((expense) => expense.id !== id);
        }
      );
    },
  });
};
