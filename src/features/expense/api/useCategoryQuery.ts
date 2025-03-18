import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Category } from '@/features/expense/model/types/Category';
import useCategoryStore from '@/features/expense/model/useCategoryStore';

import fakeApiCall from './fakeApiCall';
import { queryKeys } from '../consts';

const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch('./mock-categories.json');

  if (!res.ok) {
    throw new Error('Failed on fetch categories');
  }

  return res.json() as Promise<Category[]>;
};

const addCategory = async (category: Omit<Category, 'id'>) => {
  return await fakeApiCall<Category>({
    id: new Date().toString(),
    ...category,
  });
};

const updateCategory = async (category: Category) => {
  return await fakeApiCall<Category>(category);
};

const deleteCategory = async (id: string) => {
  return await fakeApiCall<string>(id);
};

export const useFetchCategories = () => {
  const setCategories = useCategoryStore((state) => state.setCategories);
  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys.categories],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data, setCategories]);

  return { data, error, isLoading };
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCategory,
    onSuccess: (newCategory) => {
      queryClient.setQueryData(
        queryKeys.categories,
        (oldData: Category[] | undefined) => {
          return oldData ? [...oldData, newCategory] : [newCategory];
        }
      );
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: (updatedCategory) => {
      queryClient.setQueryData(
        queryKeys.categories,
        (oldData: Category[] | undefined) => {
          return oldData?.map((category) =>
            category.id === updatedCategory.id ? updatedCategory : category
          );
        }
      );
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: (id) => {
      queryClient.setQueryData(
        queryKeys.categories,
        (oldData: Category[] | undefined) => {
          return oldData?.filter((category) => category.id !== id);
        }
      );
    },
  });
};
