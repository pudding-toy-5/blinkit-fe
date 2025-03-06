// expenseStore
export interface ExpenseState {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  //  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>;
}

export interface Expense extends ExpenseFormState {
  id: string;
}

// expenseFormStore
export interface ExpenseFormState {
  date: Date;
  category: string;
  description: string;
  amount: number;
}

export interface ExpenseFormActions {
  setDate: (value: Date) => void;
  setCategory: (value: string) => void;
  setDescription: (value: string) => void;
  setAmount: (value: number) => void;
  resetForm: () => void;
}
