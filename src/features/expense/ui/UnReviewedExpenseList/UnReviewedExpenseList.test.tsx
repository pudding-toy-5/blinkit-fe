import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import UnReviewedExpenseList, { Props } from './UnReviewedExpenseList';

describe('UnReviewedExpenseList', () => {
  const props: Props = {
    expenses: [],
    buttonWidth: 0,
    onSelectExpense: vi.fn(),
  };

  const renderElement = ({ expenses, buttonWidth, onSelectExpense }: Props) =>
    render(
      <UnReviewedExpenseList
        expenses={expenses}
        buttonWidth={buttonWidth}
        onSelectExpense={onSelectExpense}
      />
    );

  it('renders ul tag.', () => {
    const { container } = renderElement({ ...props });
    expect(container.firstChild).toHaveProperty('tagName', 'UL');
  });
});
