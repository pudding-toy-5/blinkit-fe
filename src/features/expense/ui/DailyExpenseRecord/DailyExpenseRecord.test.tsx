import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import { Expense } from '@/features/expense/model/types';

import DailyExpenseRecord from './DailyExpenseRecord';

describe('DailyExpenseRecord', () => {
  const expenseProps: Omit<Expense, 'date'> = {
    id: 'test-id',
    category: 'test-category',
    amount: 1234567890,
    memo: 'description',
  };

  const renderDailyExpenseRecord = ({
    id,
    category,
    amount,
    memo,
  }: Omit<Expense, 'date'>) => {
    return render(
      <DailyExpenseRecord
        id={id}
        category={category}
        amount={amount}
        memo={memo}
      />
    );
  };

  it('renders li tag with id and aria-labelledby.', () => {
    const { getByRole } = renderDailyExpenseRecord({ ...expenseProps });
    const listItem = getByRole('listitem');

    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveAttribute('id', expenseProps.id);
    expect(listItem).toHaveAttribute(
      'aria-labelledby',
      `expense-${expenseProps.id}`
    );
  });

  it('renders category with label and text.', () => {
    const { getByLabelText, getByText } = renderDailyExpenseRecord({
      ...expenseProps,
    });

    const categoryLabel = getByLabelText('지출 카테고리');
    expect(categoryLabel).toBeInTheDocument();

    const category = getByText(expenseProps.category);
    expect(category).toBeInTheDocument();
  });

  it('renders amount with label and localeString.', () => {
    const { getByLabelText, getByText } = renderDailyExpenseRecord({
      ...expenseProps,
    });

    const amountLabel = getByLabelText('지출 금액');
    expect(amountLabel).toBeInTheDocument();

    const amountString = `${expenseProps.amount.toLocaleString()}원`;
    const amount = getByText(amountString);
    expect(amount).toBeInTheDocument();
  });

  it('renders memo with label and text.', () => {
    const { getByLabelText, getByText } = renderDailyExpenseRecord({
      ...expenseProps,
    });

    const memoLabel = getByLabelText('메모');
    expect(memoLabel).toBeInTheDocument();

    const memo = getByText(expenseProps.memo);
    expect(memo).toBeInTheDocument();
  });
});
