import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import AddExpenseButton from './AddExpenseButton';

describe('AddExpenseButton', () => {
  it('renders correct aria-label.', () => {
    const { getByRole } = render(<AddExpenseButton />);
    const button = getByRole('button', { name: '지출 추가' });

    expect(button).toBeInTheDocument();
  });
});
