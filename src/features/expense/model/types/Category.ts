// categoryStore
export interface CategoryState {
  categories: Category[];
}

export interface CategoryActions {
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
}

export interface Category {
  id: string;
  name: string;
}
