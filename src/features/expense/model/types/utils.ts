import { Expense, ServerExpense } from '@/features/expense/model/types/Expense';

export const convertExpenseToServerExpense = (
  expense: Partial<Expense>
): ServerExpense => {
  const { uid, date, memo, amount, categories } = expense;

  const expendedDate = date ?? new Date();
  const expended_at = addLocalTimezoneOffset(
    getDateOnly(expendedDate)
  ).toISOString();

  const serverExpense: ServerExpense = {
    uid: uid ?? '',
    expended_at,
    memo: memo ?? '',
    amount: amount !== undefined ? amount.toString() : '0',
    category_uids: categories ? categories.map((category) => category.uid) : [],
  };

  return serverExpense;
};

export const convertServerExpenseToExpense = (
  serverExpense: ServerExpense
): Expense => {
  const { uid, expended_at, memo, amount, categories } = serverExpense;
  const parsedDate = new Date(expended_at);
  const parsedAmount = parseInt(amount);

  return {
    uid,
    date: isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
    memo,
    amount: isNaN(parsedAmount) ? 0 : parsedAmount,
    categories,
  } as Expense;
};

export function getDateOnly(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addLocalTimezoneOffset(date: Date) {
  const d = new Date(date);
  const offsetMinutes = d.getTimezoneOffset();
  const offsetMs = offsetMinutes * 60 * 1000;

  return new Date(d.getTime() + offsetMs);
}
