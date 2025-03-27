import { Category } from './Category';

// expense interfaces
export interface DailyExpense {
  date: Date;
  expenses: Expense[];
}

export interface Expense {
  uid: string;
  date: Date;
  categories: Category[];
  memo: string;
  amount: number;
}

// expenseFormStore
export interface ExpenseFormActions {
  setPeriod: (value: Date) => void;
  setCategories: (value: Category[]) => void;
  setCategory: (value: Category) => void;
  setMemo: (value: string) => void;
  setAmount: (value: number) => void;
  resetForm: () => void;
}
