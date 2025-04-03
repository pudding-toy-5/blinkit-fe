import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useMemo } from 'react';

import { Category } from '@/features/category/model/types/Category';
import { apiUrl } from '@/features/common/consts';
import { queryKeys } from '@/features/expense/consts';
import {
  DailyExpense,
  Expense,
  ServerExpense,
} from '@/features/expense/model/types/Expense';
import {
  convertExpenseToServerExpense,
  convertServerExpenseToExpense,
} from '@/features/expense/model/types/utils';

if (!apiUrl) {
  throw new Error('API URL이 설정되지 않았습니다.');
}
const baseUrl = apiUrl + '/expense/expenses/';

const useExpenses = () => {
  return useQuery<Expense[]>({
    queryKey: queryKeys.expenses,
    queryFn: async () => {
      try {
        const res = await axios.get(baseUrl);
        const serverExpenses = res.data as ServerExpense[];
        const expenses = serverExpenses.map((serverExpense) =>
          convertServerExpenseToExpense(serverExpense)
        );
        return expenses;
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
        const serverExpense = res.data as ServerExpense;
        return convertServerExpenseToExpense(serverExpense);
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error('지출 조회 실패 - uid: ' + uid + error.message);
        }
        throw error;
      }
    },
  });
};

const useAddExpense = (expense: Omit<Expense, 'uid'>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.post(
          baseUrl,
          convertExpenseToServerExpense(expense)
        );
        const serverExpense = res.data as ServerExpense;
        return convertServerExpenseToExpense(serverExpense);
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error('지출 추가 실패: ' + error.message);
        }
        throw error;
      }
    },
    onSuccess: (newExpense) => {
      queryClient.setQueryData(
        queryKeys.expenses,
        (oldExpenses: Expense[] | undefined) => {
          return oldExpenses ? [...oldExpenses, newExpense] : [newExpense];
        }
      );
    },
    onError: (error) => {
      console.error('지출 추가 실패: ', error);
    },
  });
};

const useUpdateExpense = (expense: Partial<Expense>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        if (expense.uid === undefined) {
          throw new Error('UpdateExpense - uid undefined');
        }

        const res = await axios.patch(
          `${baseUrl}/${expense.uid}`,
          convertExpenseToServerExpense(expense)
        );
        const serverExpense = res.data as ServerExpense;
        return convertServerExpenseToExpense(serverExpense);
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error('지출 업데이트 실패: ' + error.message);
        }
        throw error;
      }
    },
    onSuccess: (updatedExpense) => {
      queryClient.setQueryData(
        queryKeys.expenses,
        (oldExpenses: Expense[] | undefined) => {
          return oldExpenses?.map((expense) =>
            expense.uid === updatedExpense.uid ? updatedExpense : expense
          );
        }
      );
    },
    onError: (error) => {
      console.error('지출 내역 업데이트 실패: ', error);
    },
  });
};

const useDeleteExpense = (uid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        await axios.delete(`${baseUrl}/${uid}`);
        return uid;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(`지출 내역 제거 실패 uid: ${uid}. ` + error.message);
        }
        throw error;
      }
    },
    onSuccess: (uid) => {
      queryClient.setQueryData(
        queryKeys.expenses,
        (oldExpenses: Expense[] | undefined) => {
          return oldExpenses?.filter((expense) => expense.uid !== uid);
        }
      );
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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient();

    return queryClient.setQueryData<Omit<Expense, 'uid'>>(
      ['newExpense'],
      (oldExpense) => {
        return oldExpense !== undefined
          ? { ...oldExpense, [key]: value }
          : { ...initialOmittedExpense, [key]: value };
      }
    );
  };

  const updateExpenseDate = (date: Date) => {
    return updateExpenseField('date', date);
  };

  const updateExpenseMemo = (memo: string) => {
    return updateExpenseField('memo', memo);
  };

  const updateExpenseCategories = (categories: Category[]) => {
    return updateExpenseField('categories', categories);
  };

  const updateExpenseAmount = (amount: number) => {
    return updateExpenseField('amount', amount);
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
