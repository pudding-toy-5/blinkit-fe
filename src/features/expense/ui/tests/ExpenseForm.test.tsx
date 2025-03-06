import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import ExpenseForm from '../ExpenseForm';

describe('ExpenseForm', () => {
  const renderExpenseForm = () => render(<ExpenseForm />);

  it('renders label elements.', () => {
    const { getByLabelText } = renderExpenseForm();

    expect(getByLabelText('날짜')).toBeInTheDocument();
    expect(getByLabelText('카테고리')).toBeInTheDocument();
    expect(getByLabelText('메모')).toBeInTheDocument();
    expect(getByLabelText('금액')).toBeInTheDocument();
  });

  it(`renders '저장' submit button.`, () => {
    const { getByRole } = renderExpenseForm();
    const submitButton = getByRole('button', { name: '저장' });

    expect(submitButton).not.toBeNull();
  });
});
