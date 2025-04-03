import { Category } from '@/features/category/model/types/Category';
import { apiUrl } from '@/features/common/consts';
import { createEntityHooks } from '@/features/common/useEntityQuery';

import { queryKeys } from '../consts';

if (!apiUrl) {
  throw new Error('API URL이 설정되지 않았습니다.');
}
const baseUrl = apiUrl + '/expense/categories';

const {
  useEntities: useCategoriesQuery,
  useEntityByUid: useCategoryByUidQuery,
  useAddEntity: useAddCategory,
  useUpdateEntity: useUpdateCategory,
  useDeleteEntity: useDeleteCategory,
} = createEntityHooks<Category>(queryKeys.categories, baseUrl);

const useCategories = () => {
  const { data, isLoading, error } = useCategoriesQuery();
  const categories = data!;
  return { categories, isLoading, error };
};

const useCategoryByUid = (uid: string) => {
  const { data, isLoading, error } = useCategoryByUidQuery(uid);
  const category = data!;
  return { category, isLoading, error };
};

export {
  useAddCategory,
  useCategories,
  useCategoryByUid,
  useDeleteCategory,
  useUpdateCategory,
};
