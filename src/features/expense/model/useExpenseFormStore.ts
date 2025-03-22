import { create } from 'zustand';
import { Expense, ExpenseFormActions } from './types/Expense';

const initialExpenseFormState: Omit<Expense, 'uid'> = {
  date: new Date(),
  providedCategory: undefined,
  category: undefined,
  memo: '',
  amount: 0,
};

const useExpenseFormStore = create<Omit<Expense, 'uid'> & ExpenseFormActions>(
  (set) => ({
    ...initialExpenseFormState,
    setPeriod: (value) => {
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
  })
);

export default useExpenseFormStore;
