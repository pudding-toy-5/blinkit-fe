import { create } from 'zustand';
import { ExpenseActions, ExpenseState } from './types/Expense';

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
  setPeriod: (newPeriod) => {
    set({
      period: {
        year: newPeriod.getFullYear(),
        month: newPeriod.getMonth(),
      },
    });
  },
  setExpenses: (expenses) => {
    set(() => ({
      expenses,
    }));
  },
  addExpense: (expense) => {
    set((state) => ({
      expenses: [...state.expenses, { id: new Date().toString(), ...expense }],
    }));
  },
  updateExpense: (expense) => {
    set((state) => ({
      expenses: state.expenses.map((e) =>
        e.id === expense.id ? { ...e, ...expense } : e
      ),
    }));
  },
  deleteExpense: (id) => {
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== id),
    }));
  },
}));

export default useExpenseStore;
