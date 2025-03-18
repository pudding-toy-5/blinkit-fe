import { create } from 'zustand';
import { CategoryState, CategoryActions } from './types/Category';

const initialCategoryState: CategoryState = {
  categories: [],
};

const useCategoryStore = create<CategoryState & CategoryActions>((set) => ({
  ...initialCategoryState,
  addCategory: async (category) => {},
  updateCategory: async (category) => {},
  deleteCategory: async (id) => {},
}));

export default useCategoryStore;
