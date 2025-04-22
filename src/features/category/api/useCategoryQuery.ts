import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { queryKeys } from '@/features/category/consts';
import { Category } from '@/features/category/model/types/Category';
import { queryKeys as expenseQueryKeys } from '@/features/expense/consts';
import userAxios from '@/shared/api/userAxios';
import { apiUrl } from '@/shared/consts';

const baseUrl = apiUrl + '/expense/categories';

export const useCategories = () => {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery<Category[]>({
    queryKey: queryKeys.categories,
    queryFn: async () => {
      try {
        const res = await userAxios.get<Category[]>(baseUrl);
        return res.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(`카테고리 리스트 조회 실패: ${error.message}`);
        }
        throw error;
      }
    },
  });

  return { categories, isLoading, isError, error };
};

export const useCategoryByUid = (uid: string) => {
  const {
    data: category,
    isLoading,
    error,
    isError,
  } = useQuery<Category>({
    queryKey: [...queryKeys.categories, uid],
    queryFn: async () => {
      try {
        const res = await userAxios.get<Category>(baseUrl);
        return res.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(`엔티티 목록 조회 실패:  ${error.message}`);
        }
        throw error;
      }
    },
    enabled: Boolean(uid),
  });

  return { category, isLoading, isError, error };
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Omit<Category, 'uid'>, Error, Omit<Category, 'uid'>>({
    mutationFn: async (category: Omit<Category, 'uid'>) => {
      try {
        const res = await userAxios.post<Category>(baseUrl, category);
        return res.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(`카테고리 추가 실패: ${error.message}`);
        }
        throw error;
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      void queryClient.invalidateQueries({
        queryKey: expenseQueryKeys.expenses,
      });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, Category>({
    mutationFn: async (category: Category) => {
      try {
        const res = await userAxios.patch<Category>(
          `${baseUrl}/${category.uid}`
        );
        return res.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(`카테고리 업데이트 실패: ${error.message}`);
        }
        throw error;
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      void queryClient.invalidateQueries({
        queryKey: expenseQueryKeys.expenses,
      });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (uid: string) => {
      try {
        await userAxios.delete(`${baseUrl}/${uid}`);
        return uid;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(`카테고리 ${uid} 삭제 실패: ${error.message}`);
        }
        throw error;
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      void queryClient.invalidateQueries({
        queryKey: expenseQueryKeys.expenses,
      });
    },
  });
};
