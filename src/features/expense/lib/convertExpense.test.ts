import { describe, it } from 'vitest';

import { ConsumptionKind } from '@/features/expense/model/ConsumptionKind';
import { Expense, ServerExpense } from '@/features/expense/model/Expense';

import {
  addLocalTimezoneOffset,
  fromExpense,
  getDateOnly,
  toExpense,
} from './convertExpense';

describe('fromExpense', () => {
  it('converts undefined uid and memo to string.', () => {
    const expense: Partial<Expense> = {
      uid: undefined,
      memo: undefined,
    };

    const serverExpense = fromExpense(expense);

    expect(serverExpense.uid).toBe('');
    expect(serverExpense.memo).toBe('');
  });

  it('converts undefined date to new date.', () => {
    const expense: Partial<Expense> = {
      date: undefined,
    };

    const serverExpense = fromExpense(expense);

    expect(serverExpense.expended_at).not.toBe(undefined);
  });

  it('converts undefined amount to zero.', () => {
    const expense: Partial<Expense> = {
      amount: undefined,
    };

    const serverExpense = fromExpense(expense);

    expect(serverExpense.amount).toBe('0');
  });

  it('converts undefined categories to empty array.', () => {
    const expense: Partial<Expense> = {
      categories: undefined,
    };

    const serverExpense = fromExpense(expense);

    expect(serverExpense.category_uids).toHaveLength(0);
  });

  it('converts undefined consumptionKind.', () => {
    const expense: Partial<Expense> = {
      consumptionKind: undefined,
    };

    const serverExpense = fromExpense(expense);

    expect(serverExpense.consumption_kind).toBe(undefined);
  });

  it('converts correct uid, memo, date, amount, categories, consumptionKind.', () => {
    const expense: Partial<Expense> = {
      uid: 'uid',
      date: new Date(),
      memo: 'memo',
      amount: 1000,
      categories: [{ uid: 'category-1-uid', name: 'category-1' }],
      consumptionKind: ConsumptionKind.conscious,
    };

    const serverExpense = fromExpense(expense);

    expect(serverExpense.uid).toBe(expense.uid);
    expect(serverExpense.memo).toBe(expense.memo);
    expect(serverExpense.consumption_kind).toBe(expense.consumptionKind);

    if (expense.categories) {
      expect(serverExpense.category_uids).toStrictEqual(
        expense.categories.map((category) => category.uid)
      );
    }

    if (expense.date) {
      const expendedDate = addLocalTimezoneOffset(
        getDateOnly(expense.date)
      ).toISOString();
      expect(serverExpense.expended_at).toBe(expendedDate);
    }
  });
});

describe('toExpense', () => {
  const serverExpense: ServerExpense = {
    uid: 'uid',
    expended_at: new Date().toISOString(),
    memo: 'memo',
    amount: '123123',
    categories: [
      { uid: 'category-1-uid', name: 'category-1' },
      { uid: 'category-2-uid', name: 'category-2' },
    ],
    consumption_kind: ConsumptionKind.conscious,
  };

  it('converts correct serverExpense.', () => {
    const expense = toExpense({ ...serverExpense });

    expect(expense.uid).toBe(serverExpense.uid);
    expect(expense.date).toStrictEqual(new Date(serverExpense.expended_at));
    expect(expense.memo).toBe(serverExpense.memo);
    expect(expense.amount).toBe(parseInt(serverExpense.amount));
    expect(expense.categories).toBe(serverExpense.categories);
    expect(expense.consumptionKind).toBe(serverExpense.consumption_kind);
  });

  it('when expended_at is not valid, converts date to new Date.', () => {
    const expense = toExpense({ ...serverExpense, expended_at: 'nan-string' });

    expect(expense.date).toStrictEqual(getDateOnly(new Date()));
  });

  it('when amount is not valid, converts amount to zero.', () => {
    const expense = toExpense({ ...serverExpense, amount: 'not-valid-amount' });

    expect(expense.amount).toBe(0);
  });
});

describe('getDateOnly', () => {
  it('returns year, month, date', () => {
    const date = new Date();
    const converted = getDateOnly(date);

    expect(converted.getFullYear()).toBe(date.getFullYear());
    expect(converted.getMonth()).toBe(date.getMonth());
    expect(converted.getDate()).toBe(date.getDate());

    expect(converted.getHours()).toBe(0);
    expect(converted.getMinutes()).toBe(0);
    expect(converted.getSeconds()).toBe(0);
    expect(converted.getMilliseconds()).toBe(0);
  });
});

describe('addLocalTimezoneOffset', () => {
  it('returns offsetMs added date.', () => {
    const date = new Date();

    const converted = addLocalTimezoneOffset(date);

    expect(converted.getTime()).toBe(date.getTime() + 9 * 60 * 60 * 1000);
  });
});
