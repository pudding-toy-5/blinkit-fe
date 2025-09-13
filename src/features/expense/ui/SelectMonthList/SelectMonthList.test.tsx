import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SelectMonthList from './SelectMonthList';

describe('SelectMonthList', () => {
  it('renders list.', () => {
    const onSetYearMonth = vi.fn();
    const { getByRole } = render(
      <SelectMonthList
        yearMonth={{ year: 2025, month: 1 }}
        onSetYearMonth={onSetYearMonth}
      />
    );

    const list = getByRole('list');
    expect(list).toBeInTheDocument();
  });
});
