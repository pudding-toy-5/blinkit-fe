import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import { Expense } from '@/features/expense/model/types';

import ExpenseItem from './ExpenseItem';

describe('ExpenseItem', () => {
  const expenseProps: Omit<Expense, 'date'> = {
    id: 'test-id',
    category: 'test-category',
    amount: 1234567890,
    memo: 'description',
  };

  const renderExpenseItem = ({
    id,
    category,
    amount,
    memo,
  }: Omit<Expense, 'date'>) => {
    return render(
      <ExpenseItem id={id} category={category} amount={amount} memo={memo} />
    );
  };

  it('renders li tag.', () => {
    const { getByRole } = renderExpenseItem({ ...expenseProps });
    const listItem = getByRole('listitem');

    expect(listItem).toBeInTheDocument();
  });

  it('renders category with label.', () => {
    const { getByLabelText } = renderExpenseItem({ ...expenseProps });
    const category = getByLabelText('지출 카테고리');

    expect(category).toBeInTheDocument();
  });

  it('renders amount to locale string and label.', () => {
    const { getByLabelText } = renderExpenseItem({ ...expenseProps });
    const amount = getByLabelText('지출 금액');

    expect(amount).toBeInTheDocument();
  });

  it('renders memo.', () => {
    const { getByLabelText } = renderExpenseItem({ ...expenseProps });
    const memo = getByLabelText('메모');

    expect(memo).toBeInTheDocument();
  });
});
