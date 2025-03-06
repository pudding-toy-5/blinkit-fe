import { create } from 'zustand';
import { ExpenseFormState, ExpenseFormActions } from './types';

const initialExpenseFormState: ExpenseFormState = {
  category: '',
  date: new Date(),
  description: '',
  amount: 0,
};

export const useExpenseStore = create<ExpenseFormState & ExpenseFormActions>(
  (set) => ({
    ...initialExpenseFormState,
    setDate: (value) => {
      set({ date: value });
    },
    setCategory: (value) => {
      set({ category: value });
    },
    setDescription: (value) => {
      set({ description: value });
    },
    setAmount: (value) => {
      set({ amount: value });
    },
    resetForm: () => {
      set({ ...initialExpenseFormState });
    },
  })
);
