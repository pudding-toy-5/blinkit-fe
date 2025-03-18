import { create } from 'zustand';
import { CategoryState, CategoryActions } from './types/Category';

const initialCategoryState: CategoryState = {
  categories: [],
};

const useCategoryStore = create<CategoryState & CategoryActions>((set) => ({
  ...initialCategoryState,
  addCategory: (category) => {},
  updateCategory: (category) => {},
  deleteCategory: (id) => {},
}));

export default useCategoryStore;
