import { create } from 'zustand';
import { Category, CategoryState } from './types';

const initialCategoryState: CategoryState = {
  categories: [],
};

const useCategoryStore = create<CategoryState>((set) => ({
  ...initialCategoryState,
}));
