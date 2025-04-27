import { render } from '@testing-library/react';
import { describe } from 'vitest';

import DailyExpenseList, { DailyExpenseListProps } from './DailyExpenseList';

describe('DailyExpenseList', () => {
  const renderDailyExpenseList = ({ dailyExpenses }: DailyExpenseListProps) =>
    render(<DailyExpenseList dailyExpenses={dailyExpenses} />);

  it('when length of dailyExpenses is 0, renders help text.', () => {
    const { getByText } = renderDailyExpenseList({
      dailyExpenses: [],
    });
    const text = getByText('지출 내역을 추가해주세요.');

    expect(text).toBeInTheDocument();
  });

  it('renders daily-expenses-list label', () => {
    const { getByLabelText } = renderDailyExpenseList({
      dailyExpenses: [],
    });
    const label = getByLabelText('daily-expense-list');

    expect(label).toBeInTheDocument();
  });
});
