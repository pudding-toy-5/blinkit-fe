import { ProvidedCategoryValue } from './ProvidedCategory';
import { Category } from './Category';

// expenseStore
export interface ExpenseState {
  period: {
    year: number;
    month: number;
  };
  totalAmount: number;
  expenses: Expense[];
  dailyExpenses: DailyExpense[];
}

export interface ExpenseActions {
  setPeriod: (newPeriod: Date) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>;
  updateExpense: (expense: Expense) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

// expenseFormStore
export interface ExpenseFormActions {
  setDate: (value: Date) => void;
  setProvidedCategory: (value: ProvidedCategoryValue) => void;
  setCategory: (value: Category) => void;
  setMemo: (value: string) => void;
  setAmount: (value: number) => void;
  resetForm: () => void;
}

// expense interfaces
export interface DailyExpense {
  date: Date;
  expenses: Expense[];
}

export interface Expense {
  id: string;
  date: Date;
  providedCategory?: ProvidedCategoryValue;
  category?: Category;
  memo: string;
  amount: number;
}
