import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { DailyExpense, Expense } from '@/features/expense/model/Expense';

import DailyExpenseListItem from './DailyExpenseListItem';

describe('DailyExpenseListItem', () => {
  const expense: Expense = {
    uid: 'expense-test-id',
    date: new Date(),
    categories: [],
    memo: 'test-memo',
    amount: 1234567890,
  };

  const renderDailyExpenseListItem = ({ expenses }: DailyExpense) => {
    return render(
      <DailyExpenseListItem date={new Date()} expenses={expenses} />
    );
  };

  it('renders nothing when expenses prop is empty.', () => {
    const { container } = renderDailyExpenseListItem({
      date: new Date(),
      expenses: [],
    });

    expect(container.firstChild).toBeNull();
  });

  it('renders list item with aria-labelled-by.', () => {
    const date = new Date();
    const { getByRole } = renderDailyExpenseListItem({
      date: date,
      expenses: [{ ...expense }],
    });
    const listItem = getByRole('listitem');

    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveAttribute(
      'aria-labelledby',
      `daily-expense-list-item-${date.getDate().toString()}`
    );
  });

  it('renders date.', () => {
    const date = new Date();
    const { getByText } = renderDailyExpenseListItem({
      date: date,
      expenses: [{ ...expense }],
    });
    const dateElement = getByText(`${date.getDate().toString()}일`);

    expect(dateElement).toBeInTheDocument();
  });
});
