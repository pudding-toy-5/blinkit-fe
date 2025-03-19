import { createEntityHooks } from '@/features/common/useEntityQuery';

import { Category } from '@/features/expense/model/types/Category';

import { queryKeys } from '../consts';

const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch('./mock-categories.json');

  if (!res.ok) {
    throw new Error('Failed on fetch categories');
  }

  return res.json() as Promise<Category[]>;
};

const {
  useEntities: useCategoriesQuery,
  useEntityByUid: useCategoryByUid,
  useAddEntity: useAddCategory,
  useUpdateEntity: useUpdateCategory,
  useDeleteEntity: useDeleteCategory,
} = createEntityHooks<Category>(queryKeys.categories, fetchCategories);

const useCategories = () => {
  const { data, isLoading, error } = useCategoriesQuery();
  return { categories: data, isLoading, error };
};

export {
  useCategories,
  useCategoryByUid,
  useAddCategory,
  useUpdateCategory,
  useDeleteCategory,
};
