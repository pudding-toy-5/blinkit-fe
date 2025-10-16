import { fireEvent, render } from '@testing-library/react';

import YearMonthList, { type YearMonthListProps } from '../YearMonthList';
import { YearMonthListItemProps } from '../YearMonthListItem';

vi.mock('../YearMonthListItem', () => {
  return {
    default: (props: YearMonthListItemProps) => (
      <li
        onClick={() => {
          props.onClick();
        }}
      >
        {props.date.toString()}
      </li>
    ),
  };
});

describe('YearMonthList', () => {
  const onSelect = vi.fn();
  const currentDate = new Date();
  const current = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const minDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );

  const props: YearMonthListProps = {
    minDate: minDate,
    maxDate: current,
    selected: current,
    onSelect,
  };

  const renderElement = ({
    minDate,
    maxDate,
    selected,
    onSelect,
  }: YearMonthListProps) =>
    render(
      <YearMonthList
        minDate={minDate}
        maxDate={maxDate}
        selected={selected}
        onSelect={onSelect}
      />
    );

  it('renders list.', () => {
    const { getByRole } = renderElement({ ...props });

    const list = getByRole('list');
    expect(list).toBeInTheDocument();
  });

  describe('YearMonthListItem onClick', () => {
    it('when YearMonthListItem calls onClick, calls onSelect with date', () => {
      const { getByText } = renderElement({ ...props });

      const listItem = getByText(minDate.toString());

      expect(listItem).toBeInTheDocument();
      fireEvent.click(listItem);

      expect(props.onSelect).toBeCalledWith(props.minDate);
    });
  });
});
