import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { formatDate } from 'date-fns';
import { useMemo } from 'react';

import { apiUrl } from '@/features/common/consts';
import { queryKeys } from '@/features/expense/consts';
import { ConsumptionKind } from '@/features/expense/model/types/ConsumptionKind';
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

export const useExpenses = ({
  period,
  categoryUids: category_uids,
  consumptionKind: consumption_kind,
}: {
  period: Period;
  categoryUids?: string[];
  consumptionKind?: ConsumptionKind;
}) => {
  const { year, month } = period;

  return useQuery<Expense[]>({
    queryKey: [...queryKeys.expenses, period, category_uids, consumption_kind],
    queryFn: async () => {
      try {
        const res = await userAxios.get<ServerExpense[]>(baseUrl, {
          params: {
            year: year.toString(),
            month: month.toString(),
            category_uids,
            consumption_kind,
          },
          paramsSerializer: { indexes: null },
        });
        const expenses = res.data.map((serverExpense) =>
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

export const useExpensesByRange = ({
  start,
  end,
  consumptionKind,
}: {
  start: Date;
  end: Date;
  consumptionKind: ConsumptionKind;
}) => {
  return useQuery<Expense[]>({
    queryKey: [...queryKeys.expenses, start, end, consumptionKind],
    queryFn: async () => {
      try {
        const res = await userAxios.get(baseUrl, {
          params: {
            start_date: formatDate(start, 'yyyy-MM-dd'),
            end_date: formatDate(end, 'yyyy-MM-dd'),
            consumption_kind: consumptionKind,
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

export const useExpensesByPeriod = (period: Period) => {
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

export const useExpenseByUid = (uid: string) => {
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

export const useAddExpense = () => {
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
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.expenses });
      void queryClient.invalidateQueries({ queryKey: ['retrospective'] });
    },
    onError: (error) => {
      console.error('지출 추가 실패: ', error);
    },
  });
};

export const useUpdateExpense = () => {
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
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.expenses });
      void queryClient.invalidateQueries({ queryKey: ['retrospective'] });
    },
    onError: (error) => {
      console.error('지출 내역 업데이트 실패: ', error);
    },
  });
};

export const useDeleteExpense = () => {
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
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.expenses });
      void queryClient.invalidateQueries({ queryKey: ['retrospective'] });
    },
    onError: (error) => {
      console.error('지출 내역 삭제 실패: ', error);
    },
  });
};

export const useDailyExpensesByPeriod = (period: Period) => {
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

export const useTotalAmountByPeriod = (period: Period) => {
  const { data: expenses = [], isLoading, error } = useExpensesByPeriod(period);

  const totalAmount = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses]
  );

  return { totalAmount, isLoading, error };
};

export const useExpenseCountByRange = ({
  start,
  end,
}: {
  start: Date;
  end: Date;
}) => {
  return useQuery<number>({
    queryKey: ['expense-count', start, end],
    queryFn: async () => {
      try {
        const res = await userAxios.get<{ expense_count: number }>(
          baseUrl + '/counts',
          {
            params: {
              start_date: formatDate(start, 'yyyy-MM-dd'),
              end_date: formatDate(end, 'yyyy-MM-dd'),
            },
          }
        );

        return res.data.expense_count;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error('지출 개수 조회 실패' + error.message);
        }
        throw error;
      }
    },
  });
};
