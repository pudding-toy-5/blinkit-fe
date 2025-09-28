import { fireEvent, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import YearMonth from '@/shared/model/YearMonth';

import { YearMonthListItemProps } from '../YearMonthListItem';
import YearMonthListItem from '../YearMonthListItem';

describe('YearMonthListItem', () => {
  const current = new Date();
  const currentYearMonth: YearMonth = {
    year: current.getFullYear(),
    month: current.getMonth() + 1,
  };

  const onClick = vi.fn();

  const props: YearMonthListItemProps = {
    yearMonth: currentYearMonth,
    isSelected: false,
    onClick: onClick,
  };

  const renderElement = ({
    yearMonth,
    isSelected,
    onClick,
  }: YearMonthListItemProps) => {
    return render(
      <YearMonthListItem
        yearMonth={yearMonth}
        isSelected={isSelected}
        onClick={onClick}
      />
    );
  };

  it('renders button and listitem with yearMonth.', () => {
    const { getByRole } = renderElement({ ...props });

    const listitem = getByRole('listitem');
    expect(listitem).toBeInTheDocument();

    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(`${currentYearMonth.year.toString()}년`);
    expect(button).toHaveTextContent(`${currentYearMonth.month.toString()}월`);
  });

  describe('selected icon', () => {
    it('when isSelected is false, does not render selected icon.', () => {
      const { queryByLabelText } = renderElement({
        ...props,
        isSelected: false,
      });

      expect(queryByLabelText('selected icon')).not.toBeInTheDocument();
    });

    it('when isSelected is true, renders selected icon.', () => {
      const { getByLabelText } = renderElement({ ...props, isSelected: true });

      expect(getByLabelText('selected icon')).toBeInTheDocument();
    });
  });

  it('when button is clicked, calls handleClick with year and month.', () => {
    const { getByRole } = renderElement({ ...props });

    const button = getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(props.onClick).toBeCalled();
  });
});
