import useExpenseStore from './useExpenseStore';
import useExpenseFormStore from './useExpenseFormStore';
import useCategoryStore from './useCategoryStore';

// expenseStore
export const usePeriod = () => {
  return useExpenseStore((state) => state.period);
};

export const useTotalAmount = () => {
  return useExpenseStore((state) => state.totalAmount);
};

export const useExpenses = () => {
  return useExpenseStore((state) => state.expenses);
};

export const useDailyExpenses = () => {
  return useExpenseStore((state) => state.dailyExpenses);
};

// expenseFormStore
export const useExpenseForm = () => {
  return useExpenseFormStore((state) => state);
};

// categoryStore
export const useCategories = () => {
  return useCategoryStore((state) => state.categories);
};
