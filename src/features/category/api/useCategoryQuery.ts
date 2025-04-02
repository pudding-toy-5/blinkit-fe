import { Category } from '@/features/category/model/types/Category';
import { apiUrl } from '@/features/common/consts';
import { createEntityHooks } from '@/features/common/useEntityQuery';

import { queryKeys } from '../consts';

const baseUrl = apiUrl + '/expense/categories';

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
