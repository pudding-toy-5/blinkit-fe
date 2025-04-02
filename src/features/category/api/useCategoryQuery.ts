import axios from 'axios';

import { Category } from '@/features/category/model/types/Category';
import { createEntityHooks } from '@/features/common/useEntityQuery';

import { queryKeys } from '../consts';

const fetchCategories = async (): Promise<Category[]> => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/expense/categories/`
  );

  return res.data as Category[];
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
  useAddCategory,
  useCategories,
  useCategoryByUid,
  useDeleteCategory,
  useUpdateCategory,
};
