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
  // useEntityByUid: useCategoryByUidQuery,
  useAddEntity: useAddCategory,
  useUpdateEntity: useUpdateCategory,
  useDeleteEntity: useDeleteCategory,
} = createEntityHooks<Category>(queryKeys.categories, baseUrl);

const useCategories = () => {
  const { data: categories, isLoading, isError, error } = useCategoriesQuery();
  return { categories, isLoading, isError, error };
};

const useCategoryByUid = (uid: string) => {
  // const { data: category, isLoading, isError, error } = useCategoryByUidQuery(uid);
  // return { category, isLoading, isError, error };
  const { categories, isLoading, isError, error } = useCategories();
  const category = categories?.find((category) => category.uid === uid);
  return { category, isLoading, isError, error };
};

export {
  useAddCategory,
  useCategories,
  useCategoryByUid,
  useDeleteCategory,
  useUpdateCategory,
};
