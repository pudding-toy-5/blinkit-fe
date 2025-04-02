import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import ExpenseForm, { ExpenseFormProps } from './ExpenseForm';

describe('ExpenseForm', () => {
  const renderElement = ({
    submitButtonText = 'submit button text',
  }: ExpenseFormProps) =>
    render(<ExpenseForm submitButtonText={submitButtonText} />);

  it('renders provided submitButtonText.', () => {
    const text = 'submit button text example';
    const { getByRole } = renderElement({ submitButtonText: text });
    const submitButton = getByRole('button', { name: text });

    expect(submitButton).toBeInTheDocument();
  });
});
