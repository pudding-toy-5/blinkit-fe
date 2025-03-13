import { create } from 'zustand';
import { Expense, ExpenseAction, ExpenseState } from './types';

const initialExpenseState: ExpenseState = {
  month: '',
  totalAmount: 0,
  expenses: [],
};

export const useExpenseStore = create<ExpenseState & ExpenseAction>((set) => ({
  ...initialExpenseState,
  setMonth: (newMonth: string) => {
    set({ month: newMonth });
  },
  addExpense: async (newExpense: Omit<Expense, 'id'>) => {
    // const addedExpense = await addExpense(newExpense);
  },
}));
