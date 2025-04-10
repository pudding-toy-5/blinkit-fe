import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/features/category/consts';
import { Category } from '@/features/category/model/types/Category';
import { apiUrl } from '@/features/common/consts';
import { createEntityHooks } from '@/features/common/useEntityQuery';
import { queryKeys as expenseQueryKeys } from '@/features/expense/consts';

if (!apiUrl) {
  throw new Error('API URL이 설정되지 않았습니다.');
}
const baseUrl = apiUrl + '/expense/categories';

const {
  useEntities: useCategoriesQuery,
  // useEntityByUid: useCategoryByUidQuery,
  useAddEntity: useAddCategory,
  useUpdateEntity: useUpdateCategoryQuery,
  useDeleteEntity: useDeleteCategoryQuery,
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

const useUpdateCategory = () => {
  const qc = useQueryClient();
  return useUpdateCategoryQuery({
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: expenseQueryKeys.expenses });
      // void qc.invalidateQueries({ queryKey: ['newExpense'] });
    },
  });
};

const useDeleteCategory = () => {
  const qc = useQueryClient();
  return useDeleteCategoryQuery({
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: expenseQueryKeys.expenses });
      // void qc.invalidateQueries({ queryKey: ['newExpense'] });
    },
  });
};

export {
  useAddCategory,
  useCategories,
  useCategoryByUid,
  useDeleteCategory,
  useUpdateCategory,
};
