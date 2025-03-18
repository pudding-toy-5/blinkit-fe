import { create } from 'zustand';
import { CategoryState, CategoryActions } from './types/Category';

const initialCategoryState: CategoryState = {
  categories: [],
};

const useCategoryStore = create<CategoryState & CategoryActions>((set) => ({
  ...initialCategoryState,
  setCategories: (categories) => {
    set(() => ({
      categories,
    }));
  },
  addCategory: (category) => {
    set((state) => ({
      categories: [
        ...state.categories,
        { id: new Date().toString(), ...category },
      ],
    }));
  },
  updateCategory: (category) => {
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === category.id ? { ...c, ...category } : c
      ),
    }));
  },
  deleteCategory: (id) => {
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    }));
  },
}));

export default useCategoryStore;
