import { render } from '@testing-library/react';
import { format } from 'date-fns';
import { describe, it } from 'vitest';

import { Expense } from '@/features/expense/model/types/Expense';

import ReviewExpenseCard from './ReviewExpenseCard';

describe('ReviewExpenseCard', () => {
  it('renders provided expense.', () => {
    const expense: Expense = {
      uid: 'expense-uid',
      date: new Date(),
      memo: 'expense-memo',
      categories: [{ uid: 'category-1-uid', name: 'category-1' }],
      amount: 1000,
    };

    const { getByText } = render(<ReviewExpenseCard expense={expense} />);

    const date = getByText(format(expense.date, 'yyyy. M. d.'));
    const amount = getByText(expense.amount.toLocaleString() + '원');
    const categories = [...expense.categories].map((category) =>
      getByText(category.name)
    );

    expect(date).toBeInTheDocument();
    expect(amount).toBeInTheDocument();

    categories.forEach((category) => {
      expect(category).toBeInTheDocument();
    });
  });
});
