import { ProvidedCategoryValue } from './ProvidedCategory';
// expenseStore
export interface ExpenseState {
  period: {
    year: number;
    month: number;
  };
  totalAmount: number;
  addedCategories: AddedCategory[];
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

export interface AddedCategory {
  name: string;
}

export interface Expense extends ExpenseFormState {
  id: string;
}

// expenseFormStore
export interface ExpenseFormState {
  date: Date;
  category: ProvidedCategoryValue | AddedCategory;
  memo: string;
  amount: number;
}

export interface ExpenseFormActions {
  setDate: (value: Date) => void;
  setCategory: (value: string) => void;
  setMemo: (value: string) => void;
  setAmount: (value: number) => void;
  resetForm: () => void;
}
