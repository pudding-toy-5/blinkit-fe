import { describe, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import SelectMonthListItem from './SelectMonthListItem';

describe('SelectMonthListItem', () => {
  it('renders button with year, month.', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <SelectMonthListItem
        year={2025}
        month={1}
        selected={true}
        handleClick={handleClick}
      />
    );
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('2025년 1월');
  });

  it('when selected, renders selected icon.', () => {
    const handleClick = vi.fn();
    const { getByLabelText } = render(
      <SelectMonthListItem
        year={2025}
        month={1}
        selected={true}
        handleClick={handleClick}
      />
    );

    expect(getByLabelText('selected icon')).toBeInTheDocument();
  });

  it('when button is clicked, calls handleClick with year and month.', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <SelectMonthListItem
        year={2025}
        month={1}
        selected={true}
        handleClick={handleClick}
      />
    );

    const button = getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(handleClick).toBeCalledWith({ year: 2025, month: 1 });
  });
});
