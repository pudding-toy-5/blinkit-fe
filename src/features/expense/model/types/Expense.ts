import { Category } from '@/features/category/model/types/Category';

import { ConsumptionKind } from './ConsumptionKind';

// expense interfaces
export interface DailyExpense {
  date: Date;
  expenses: Expense[];
}

export interface ServerExpense {
  uid: string;
  expended_at: string;
  categories?: Category[];
  category_uids?: string[];
  consumption_kind?: ConsumptionKind;
  memo: string;
  amount: string;
}

export interface Expense {
  uid: string;
  date: Date;
  categories: Category[];
  consumptionKind?: ConsumptionKind;
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
