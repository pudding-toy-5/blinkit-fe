import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ExpensesPage } from '../expenses';

describe('ExpensesPage', () => {
  it(`renders title.`, () => {
    const { getByRole } = render(<ExpensesPage />);
    const titleElement = getByRole('h1');

    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName.toLowerCase()).toBe('h1');
  });
});
