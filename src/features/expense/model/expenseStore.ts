import { create } from 'zustand';
import { ExpenseState } from './types';

export const useExpenseStore = create<ExpenseState>(() => ({
  expenses: [],
  addExpense: () => {
    return;
  },
}));
