import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { YearMonthListProps } from '../YearMonthList';
import YearMonthList from '../YearMonthList';

describe('YearMonthList', () => {
  const current = new Date();
  const currentYear = current.getFullYear();
  const currentMonth = current.getMonth() + 1;

  const onSelect = vi.fn();

  const props: YearMonthListProps = {
    selected: { year: currentYear, month: currentMonth },
    onSelect,
  };

  const renderElement = ({ selected, onSelect }: YearMonthListProps) => {
    return render(<YearMonthList selected={selected} onSelect={onSelect} />);
  };

  it('renders list.', () => {
    const { getByRole } = renderElement({ ...props });

    const list = getByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('when clicks listitem button, calls onSelect with yearMonth of selected listitem', () => {
    const { getAllByRole } = renderElement({ ...props });

    const buttons = getAllByRole('button');
    const targetButton = buttons.find(
      (button) =>
        button.textContent?.includes(`${currentYear.toString()}년`) &&
        button.textContent.includes(`${currentMonth.toString()}월`)
    );

    if (targetButton) {
      fireEvent.click(targetButton);
      expect(props.onSelect).toBeCalledWith({
        year: currentYear,
        month: currentMonth,
      });
    }
  });
});
