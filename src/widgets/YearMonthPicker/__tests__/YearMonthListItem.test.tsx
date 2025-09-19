import { fireEvent, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import YearMonthListItem from '../YearMonthListItem';

describe('SelectMonthListItem', () => {
  it('renders button and listitem with year, month.', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <YearMonthListItem
        yearMonth={{ year: 2025, month: 1 }}
        isSelected={true}
        handleClick={handleClick}
      />
    );
    const listitem = getByRole('listitem');
    expect(listitem).toBeInTheDocument();

    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('2025년 1월');
  });

  it('when selected, renders selected icon.', () => {
    const handleClick = vi.fn();
    const { getByLabelText } = render(
      <YearMonthListItem
        yearMonth={{ year: 2025, month: 1 }}
        isSelected={true}
        handleClick={handleClick}
      />
    );

    expect(getByLabelText('selected icon')).toBeInTheDocument();
  });

  it('when button is clicked, calls handleClick with year and month.', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <YearMonthListItem
        yearMonth={{ year: 2025, month: 1 }}
        isSelected={true}
        handleClick={handleClick}
      />
    );

    const button = getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(handleClick).toBeCalledWith({ year: 2025, month: 1 });
  });
});
