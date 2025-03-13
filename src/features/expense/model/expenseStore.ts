import { create } from 'zustand';
import { Expense, DayExpenses, ExpenseAction, ExpenseState } from './types';

const initialExpenseState: ExpenseState = {
  month: '',
  totalAmount: 0,
  expenses: [],
  dayExpenses: [],
};

export const useExpenseStore = create<ExpenseState & ExpenseAction>((set) => ({
  ...initialExpenseState,
  setMonth: (newMonth: string) => {
    set({ month: newMonth });
  },
  addExpense: async (newExpense: Omit<Expense, 'id'>) => {
    // const addedExpense = await addExpense(newExpense);
    set((state) => ({
      totalAmount: state.totalAmount + newExpense.amount,
    }));
  },
}));
