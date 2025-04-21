import { Expense, ServerExpense } from '@/features/expense/model/types/Expense';

export const fromExpense = (expense: Partial<Expense>): ServerExpense => {
  const { uid, date, memo, amount, categories, consumptionKind } = expense;

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
    consumption_kind: consumptionKind,
  };

  return serverExpense;
};

export const toExpense = (serverExpense: ServerExpense): Expense => {
  const { uid, expended_at, memo, amount, categories, consumption_kind } =
    serverExpense;
  const parsedDate = new Date(expended_at);
  const parsedAmount = parseInt(amount);

  return {
    uid,
    date: isNaN(parsedDate.getTime()) ? getDateOnly(new Date()) : parsedDate,
    memo,
    amount: isNaN(parsedAmount) ? 0 : parsedAmount,
    categories,
    consumptionKind: consumption_kind,
  } as Expense;
};

export function getDateOnly(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addLocalTimezoneOffset(date: Date) {
  const d = new Date(date);
  // const offsetMinutes = d.getTimezoneOffset();
  const offsetMinutes = 9 * 60;
  const offsetMs = offsetMinutes * 60 * 1000;

  return new Date(d.getTime() + offsetMs);
}
