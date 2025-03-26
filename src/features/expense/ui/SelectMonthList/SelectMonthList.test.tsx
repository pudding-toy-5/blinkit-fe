import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import SelectMonthList from './SelectMonthList';

describe('SelectMonthList', () => {
  it('renders list.', () => {
    const onSetPeriod = vi.fn();
    const { getByRole } = render(
      <SelectMonthList
        period={{ year: 2025, month: 1 }}
        onSetPeriod={onSetPeriod}
      />
    );

    const list = getByRole('list');
    expect(list).toBeInTheDocument();
  });
});
