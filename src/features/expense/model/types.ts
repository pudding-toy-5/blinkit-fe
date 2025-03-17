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
}

export interface DailyExpense {
  date: Date;
  expenses: Expense[];
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
