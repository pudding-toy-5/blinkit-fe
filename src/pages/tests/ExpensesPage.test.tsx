import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import { createRoutesStub } from 'react-router';

import ExpensesPage from '../ExpensesPage';

describe('ExpensesPage', () => {
  const ExpensesStub = createRoutesStub([
    {
      path: '/expenses',
      Component: ExpensesPage,
    },
  ]);

  it(`renders title.`, () => {
    const { getByRole } = render(<ExpensesStub initialEntries={['/']} />);
    const titleElement = getByRole('h1');

    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName.toLowerCase()).toBe('h1');
  });
});
