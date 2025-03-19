import useExpenseFormStore from './useExpenseFormStore';

// expenseFormStore
export const useExpenseForm = () => {
  return useExpenseFormStore((state) => state);
};
