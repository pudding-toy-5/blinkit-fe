import axios from 'axios';

import { Category } from '@/features/category/model/types/Category';
import { createEntityHooks } from '@/features/common/useEntityQuery';

import { queryKeys } from '../consts';

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const baseUrl = `${import.meta.env.VITE_API_URL}/expense/categories`;

const {
  useEntities: useCategoriesQuery,
  useEntityByUid: useCategoryByUid,
  useAddEntity: useAddCategory,
  useUpdateEntity: useUpdateCategory,
  useDeleteEntity: useDeleteCategory,
} = createEntityHooks<Category>(queryKeys.categories, baseUrl);

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
