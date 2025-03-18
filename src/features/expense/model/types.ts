import { ProvidedCategoryValue } from './ProvidedCategory';
// expenseStore
export interface ExpenseState {
  period: {
    year: number;
    month: number;
  };
  totalAmount: number;
  categories: Category[];
  expenses: Expense[];
  dailyExpenses: DailyExpense[];
}

export interface ExpenseActions {
  setPeriod: (newPeriod: Date) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>;
}

export interface DailyExpense {
  date: Date;
  expenses: Expense[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Expense {
  id: string;
  date: Date;
  providedCategory?: ProvidedCategoryValue;
  category?: Category;
  memo: string;
  amount: number;
}

export interface ExpenseFormActions {
  setDate: (value: Date) => void;
  setProvidedCategory: (value: ProvidedCategoryValue) => void;
  setCategory: (value: Category) => void;
  setMemo: (value: string) => void;
  setAmount: (value: number) => void;
  resetForm: () => void;
}
