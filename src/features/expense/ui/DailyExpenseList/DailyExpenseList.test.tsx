import { render } from '@testing-library/react';
import { describe, vi } from 'vitest';

import DailyExpenseList, { DailyExpenseListProps } from './DailyExpenseList';

describe('DailyExpenseList', () => {
  const renderDailyExpenseList = ({
    dailyExpenses,
    onScroll = vi.fn(),
  }: DailyExpenseListProps) =>
    render(
      <DailyExpenseList dailyExpenses={dailyExpenses} onScroll={onScroll} />
    );

  it('when length of dailyExpenses is 0, renders help text.', () => {
    const { getByText } = renderDailyExpenseList({
      dailyExpenses: [],
      onScroll: vi.fn(),
    });
    const text = getByText('지출 내역을 추가해주세요.');

    expect(text).toBeInTheDocument();
  });

  it('renders daily-expenses-list label', () => {
    const { getByLabelText } = renderDailyExpenseList({
      dailyExpenses: [],
      onScroll: vi.fn(),
    });
    const label = getByLabelText('daily-expense-list');

    expect(label).toBeInTheDocument();
  });
});
