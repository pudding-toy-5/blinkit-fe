// categoryStore
export interface CategoryState {
  categories: Category[];
}

export interface CategoryActions {
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export interface Category {
  id: string;
  name: string;
}
