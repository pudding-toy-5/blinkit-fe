import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { ConsumptionKind } from '@/features/expense/model/ConsumptionKind';
import { Expense } from '@/features/expense/model/Expense';

import ExpenseCard from './ExpenseCard';

describe('ExpenseCard', () => {
  const expenseProps: Omit<Expense, 'date'> = {
    uid: 'test-id',
    categories: [],
    amount: 1234567890,
    memo: 'description',
    consumptionKind: ConsumptionKind.none,
  };

  const renderElement = ({
    uid,
    categories,
    amount,
    memo,
  }: Omit<Expense, 'date'>) => {
    return render(
      <ExpenseCard
        uid={uid}
        categories={categories}
        amount={amount}
        memo={memo}
      />
    );
  };

  it('renders listitem with aria-labelledby.', () => {
    const { getByRole } = renderElement({ ...expenseProps });
    const listitem = getByRole('listitem');

    expect(listitem).toBeInTheDocument();
    expect(listitem).toHaveAttribute(
      'aria-labelledby',
      'expense-' + expenseProps.uid
    );
  });

  it('renders amount with label and localeString.', () => {
    const { getByLabelText, getByText } = renderElement({
      ...expenseProps,
    });

    const amountLabel = getByLabelText('지출 금액');
    expect(amountLabel).toBeInTheDocument();

    const amountString = `${expenseProps.amount.toLocaleString()}원`;
    const amount = getByText(amountString);
    expect(amount).toBeInTheDocument();
  });

  it('renders memo with label and text.', () => {
    const { getByLabelText, getByText } = renderElement({
      ...expenseProps,
    });

    const memoLabel = getByLabelText('메모');
    expect(memoLabel).toBeInTheDocument();

    const memo = getByText(expenseProps.memo);
    expect(memo).toBeInTheDocument();
  });
});
