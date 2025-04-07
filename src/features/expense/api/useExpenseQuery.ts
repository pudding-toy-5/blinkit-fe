import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMemo } from 'react';

import { Category } from '@/features/category/model/types/Category';
import { apiUrl } from '@/features/common/consts';
import { queryKeys } from '@/features/expense/consts';
import {
  DailyExpense,
  Expense,
  ServerExpense,
} from '@/features/expense/model/types/Expense';
import Period from '@/features/expense/model/types/Period';
import {
  convertExpenseToServerExpense,
  convertServerExpenseToExpense,
} from '@/features/expense/model/types/utils';
import userAxios from '@/shared/api/userAxios';

if (!apiUrl) {
  throw new Error('API URL이 설정되지 않았습니다.');
}
const baseUrl = apiUrl + '/expense/expenses/';

const useExpensesByPeriod = (period: Period) => {
  const { year, month } = period;
  return useQuery<Expense[]>({
    queryKey: [...queryKeys.expenses, period],
    queryFn: async () => {
      try {
        const res = await userAxios.get(baseUrl, {
          params: {
            year: year.toString(),
            month: month.toString(),
          },
        });
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
        const res = await userAxios.get(`${baseUrl}${uid}`);

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

const useAddExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expense: Omit<Expense, 'uid'>) => {
      try {
        const res = await userAxios.post(
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

const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expense: Partial<Expense>) => {
      try {
        if (expense.uid === undefined) {
          throw new Error('UpdateExpense - uid undefined');
        }

        const res = await userAxios.patch(
          `${baseUrl}${expense.uid}`,
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

const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (uid: string) => {
      try {
        await userAxios.delete(`${baseUrl}${uid}`);
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
    onError: (error) => {
      console.error('지출 내역 삭제 실패: ', error);
    },
  });
};

const useDailyExpensesByPeriod = (period: Period) => {
  const {
    data: expenses = [],
    isLoading,
    isError,
    error,
  } = useExpensesByPeriod(period);

  if (isError) {
    throw new Error('Failed on useDailyExpensesByPeriod: ' + error.message);
  }

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

  return { dailyExpenses, isLoading, isError, error };
};

const useTotalAmountByPeriod = (period: Period) => {
  const { data: expenses = [], isLoading, error } = useExpensesByPeriod(period);

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

  const updateNewExpense = (expense: Omit<Expense, 'uid'>) => {
    return queryClient.setQueryData<Omit<Expense, 'uid'>>(
      ['newExpense'],
      () => {
        return expense;
      }
    );
  };

  const updateNewExpenseField = <K extends keyof Omit<Expense, 'uid'>>(
    key: K,
    value: Omit<Expense, 'uid'>[K]
  ) => {
    return queryClient.setQueryData<Omit<Expense, 'uid'>>(
      ['newExpense'],
      (oldExpense) => {
        return oldExpense !== undefined
          ? { ...oldExpense, [key]: value }
          : { ...initialOmittedExpense, [key]: value };
      }
    );
  };

  const updateNewExpenseDate = (date: Date) => {
    return updateNewExpenseField('date', date);
  };

  const updateNewExpenseMemo = (memo: string) => {
    return updateNewExpenseField('memo', memo);
  };

  const updateNewExpenseCategories = (categories: Category[]) => {
    return updateNewExpenseField('categories', categories);
  };

  const updateNewExpenseAmount = (amount: number) => {
    return updateNewExpenseField('amount', amount);
  };

  return {
    newExpense,
    updateNewExpense,
    updateNewExpenseDate,
    updateNewExpenseMemo,
    updateNewExpenseCategories,
    updateNewExpenseAmount,
  };
};

export {
  useAddExpense,
  useDailyExpensesByPeriod,
  useDeleteExpense,
  useExpenseByUid,
  useExpensesByPeriod,
  useNewExpense,
  useTotalAmountByPeriod,
  useUpdateExpense,
};
