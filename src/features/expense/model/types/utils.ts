import { Expense, ServerExpense } from '@/features/expense/model/types/Expense';

export const convertExpenseToServerExpense = (
  expense: Partial<Expense>
): ServerExpense => {
  const { uid, date, memo, amount, categories } = expense;

  const serverExpense: ServerExpense = {
    uid: uid ?? '',
    expended_at: date ? date.toISOString() : new Date().toISOString(),
    memo: memo ?? '',
    amount: amount ? amount.toString() : '0',
    categories: categories ?? [],
  };

  return serverExpense;
};

export const convertServerExpenseToExpense = (
  serverExpense: ServerExpense
): Expense => {
  const { uid, expended_at, memo, amount, categories } = serverExpense;
  const parsedAmount = parseInt(amount);

  return {
    uid,
    date: new Date(expended_at),
    memo,
    amount: isNaN(parsedAmount) ? 0 : parsedAmount,
    categories,
  } as Expense;
};
