// expenseStore
export interface ExpenseState {
  month: string;
  totalAmount: number;
  expenses: Expense[];
}

export interface ExpenseAction {
  setMonth: (newMonth: string) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>;
}

export interface Expense extends ExpenseFormState {
  id: string;
}

// expenseFormStore
export interface ExpenseFormState {
  date: Date;
  category: string;
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
