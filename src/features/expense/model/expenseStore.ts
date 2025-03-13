import { create } from 'zustand';
import { Expense, DayExpenses, ExpenseActions, ExpenseState } from './types';

const current = new Date();
const year = current.getFullYear();
const month = current.getMonth();

const initialExpenseState: ExpenseState = {
  period: {
    year: year,
    month: month,
  },
  totalAmount: 0,
  expenses: [],
  dayExpenses: [],
};

export const useExpenseStore = create<ExpenseState & ExpenseActions>((set) => ({
  ...initialExpenseState,
  setPeriod: (newPeriod: Date) => {
    // set({ month: newMonth });
    set({
      period: {
        year: newPeriod.getFullYear(),
        month: newPeriod.getMonth(),
      },
    });
  },
  addExpense: async (newExpense: Omit<Expense, 'id'>) => {
    // const addedExpense = await addExpense(newExpense);
    set((state) => ({
      totalAmount: state.totalAmount + newExpense.amount,
    }));
  },
}));
