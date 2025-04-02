import { Expense, ServerExpense } from '@/features/expense/model/types/Expense';

export const convertExpenseToServerExpense = (
  expense: Partial<Expense>
): ServerExpense => {
  const { uid, date, memo, amount, categories } = expense;

  return {
    uid,
    expended_at: date?.toISOString(),
    memo,
    amount: amount?.toString(),
    categories,
  } as ServerExpense;
};

export const convertServerExpenseToExpense = (
  serverExpense: ServerExpense
): Expense => {
  const { uid, expended_at, memo, amount, categories } = serverExpense;
  return {
    uid,
    date: new Date(expended_at),
    memo,
    amount: parseInt(amount),
    categories,
  } as Expense;
};
