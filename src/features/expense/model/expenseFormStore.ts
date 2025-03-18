import { create } from 'zustand';
import { Expense, ExpenseFormActions } from './types';

const initialExpenseFormState: Omit<Expense, 'id'> = {
  date: new Date(),
  memo: '',
  amount: 0,
};

export const useExpenseFormStore = create<
  Omit<Expense, 'id'> & ExpenseFormActions
>((set) => ({
  ...initialExpenseFormState,
  setDate: (value) => {
    set({ date: value });
  },
  setProvidedCategory: (value) => {
    set({ providedCategory: value });
  },
  setCategory: (value) => {
    set({ category: value });
  },
  setMemo: (value) => {
    set({ memo: value });
  },
  setAmount: (value) => {
    set({ amount: value });
  },
  resetForm: () => {
    set({ ...initialExpenseFormState });
  },
}));
