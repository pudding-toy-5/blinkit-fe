import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import ExpenseForm from './ExpenseForm';

describe('ExpenseForm', () => {
  const renderExpenseForm = () => render(<ExpenseForm />);

  it(`renders '저장' submit button.`, () => {
    const { getByRole } = renderExpenseForm();
    const submitButton = getByRole('button', { name: '저장' });

    expect(submitButton).not.toBeNull();
  });
});
