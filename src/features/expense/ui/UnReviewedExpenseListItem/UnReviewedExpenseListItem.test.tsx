import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import UnReviewedExpenseListItem, { Props } from './UnReviewedExpenseListItem';

describe('UnReviewedExpenseListItem', () => {
  const props: Props = {
    expense: {
      uid: 'expense-uid',
      date: new Date(),
      memo: '',
      amount: 1000,
      categories: [],
    },
    buttonWidth: 0,
    onSelectReview: vi.fn(),
  };

  const renderElement = ({ expense, buttonWidth, onSelectReview }: Props) =>
    render(
      <UnReviewedExpenseListItem
        expense={expense}
        buttonWidth={buttonWidth}
        onSelectReview={onSelectReview}
      />
    );

  it('renders 리뷰하기 button.', () => {
    const { getByRole } = renderElement({ ...props });

    const reviewButton = getByRole('button', { name: '리뷰하기' });
    expect(reviewButton).toBeInTheDocument();
  });
});
