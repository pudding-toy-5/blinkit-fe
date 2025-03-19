import { createEntityHooks } from '@/features/common/useEntityQuery';

import { Category } from '@/features/expense/model/types/Category';
import useCategoryStore from '@/features/expense/model/useCategoryStore';

import { queryKeys } from '../consts';

const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch('./mock-categories.json');

  if (!res.ok) {
    throw new Error('Failed on fetch categories');
  }

  return res.json() as Promise<Category[]>;
};

const setCategories = useCategoryStore((store) => store.setCategories);

const {
  useFetchEntities: useFetchEntities,
  useAddEntity: useAddCategory,
  useUpdateEntity: useUpdateCategory,
  useDeleteEntity: useDeleteCategory,
} = createEntityHooks<Category>(
  queryKeys.categories,
  fetchCategories,
  setCategories
);

export {
  useFetchEntities,
  useAddCategory,
  useUpdateCategory,
  useDeleteCategory,
};
