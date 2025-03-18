import { create } from 'zustand';
import { Expense, ExpenseActions, ExpenseState } from './types/Expense';

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
  dailyExpenses: [],
};

const useExpenseStore = create<ExpenseState & ExpenseActions>((set) => ({
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

export default useExpenseStore;
