import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { DailyExpense, Expense } from '@/features/expense/model/types';

import DailyExpenseListItem from './DailyExpenseListItem';

describe('DailyExpenseListItem', () => {
  const expense: Expense = {
    id: 'expense-test-id',
    date: new Date('2025-03-14T15:20:00'),
    category: 'test-category',
    memo: 'test-memo',
    amount: 1234567890,
  };

  const renderDailyExpenseListItem = ({ date, expenses }: DailyExpense) => {
    return render(<DailyExpenseListItem date={date} expenses={expenses} />);
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
