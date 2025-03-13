import { describe, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import AddExpenseButton from './AddExpenseButton';

describe('AddExpenseButton', () => {
  it('renders correct aria-label.', () => {
    const mockOnClick = vi.fn();
    const { getByRole } = render(<AddExpenseButton onClick={mockOnClick} />);
    const button = getByRole('button', { name: '지출 추가' });

    expect(button).toBeInTheDocument();
  });

  it('when button is clicked, onClick should be called.', () => {
    const mockOnClick = vi.fn();
    const { getByRole } = render(<AddExpenseButton onClick={mockOnClick} />);
    const button = getByRole('button', { name: '지출 추가' });

    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockOnClick).toBeCalled();
  });
});
