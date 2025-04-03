import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useMemo } from 'react';

import { Category } from '@/features/category/model/types/Category';
import { apiUrl } from '@/features/common/consts';
import { createEntityHooks } from '@/features/common/useEntityQuery';
import { queryKeys } from '@/features/expense/consts';
import { DailyExpense, Expense } from '@/features/expense/model/types/Expense';

if (!apiUrl) {
  throw new Error('API URL이 설정되지 않았습니다.');
}
const baseUrl = apiUrl + '/expense/expenses/';

const {
  useAddEntity: useAddExpense,
  useUpdateEntity: useUpdateExpense,
  useDeleteEntity: useDeleteExpense,
} = createEntityHooks<Expense>(queryKeys.expenses, baseUrl);

const useExpenses = () => {
  return useQuery<Expense[]>({
    queryKey: queryKeys.expenses,
    queryFn: async () => {
      try {
        const res = await axios.get(baseUrl);
        return res.data as Expense[];
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error('지출 목록 조회 실패: ' + error.message);
        }
        throw error;
      }
    },
  });
};

const useExpenseByUid = (uid: string) => {
  return useQuery<Expense>({
    queryKey: [...queryKeys.expenses, uid],
    queryFn: async () => {
      try {
        const res = await axios.get(`${baseUrl}/${uid}`);
        return res.data as Expense;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error('지출 조회 실패 - uid: ' + uid + error.message);
        }
        throw error;
      }
    },
  });
};

const useDailyExpenses = () => {
  const { data: expenses = [], isLoading, error } = useExpenses();

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
  const { data: expenses = [], isLoading, error } = useExpenses();

  const totalAmount = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses]
  );

  return { totalAmount, isLoading, error };
};

const initialOmittedExpense: Omit<Expense, 'uid'> = {
  date: new Date(),
  memo: '',
  categories: [],
  amount: 0,
};

const useNewExpense = () => {
  const queryClient = useQueryClient();

  const { data: newExpense } = useQuery<Omit<Expense, 'uid'>>({
    queryKey: ['newExpense'],
    queryFn: () => Promise.resolve(initialOmittedExpense),
    enabled: false,
    initialData: initialOmittedExpense,
  });

  const updateExpenseField = <K extends keyof Omit<Expense, 'uid'>>(
    key: K,
    value: Omit<Expense, 'uid'>[K]
  ) => {
    queryClient.setQueryData<Omit<Expense, 'uid'>>(
      ['newExpense'],
      (oldExpense) => {
        return oldExpense !== undefined
          ? { ...oldExpense, [key]: value }
          : { ...initialOmittedExpense, [key]: value };
      }
    );
  };

  const updateExpenseDate = (date: Date) => {
    updateExpenseField('date', date);
  };

  const updateExpenseMemo = (memo: string) => {
    updateExpenseField('memo', memo);
  };

  const updateExpenseCategories = (categories: Category[]) => {
    updateExpenseField('categories', categories);
  };

  const updateExpenseAmount = (amount: number) => {
    updateExpenseField('amount', amount);
  };

  return {
    newExpense,
    updateExpenseDate,
    updateExpenseMemo,
    updateExpenseCategories,
    updateExpenseAmount,
  };
};

export {
  useAddExpense,
  useDailyExpenses,
  useDeleteExpense,
  useExpenseByUid,
  useExpenses,
  useNewExpense,
  useTotalAmount,
  useUpdateExpense,
};
