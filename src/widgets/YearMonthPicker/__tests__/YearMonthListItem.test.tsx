import { fireEvent, queryByLabelText, render } from '@testing-library/react';

import YearMonthListItem, {
  YearMonthListItemProps,
} from '../YearMonthListItem';

describe('YearMonthListItem', () => {
  const props: YearMonthListItemProps = {
    date: new Date(),
    isSelected: false,
    onClick: vi.fn(),
  };

  const renderElement = ({
    date,
    isSelected,
    onClick,
  }: YearMonthListItemProps) =>
    render(
      <YearMonthListItem
        date={date}
        isSelected={isSelected}
        onClick={onClick}
      />
    );

  it('renders year and month.', () => {
    const { getByText } = renderElement({ ...props });

    const dateString = `${props.date.getFullYear().toString()}년 ${(props.date.getMonth() + 1).toString()}월`;
    const dateText = getByText(dateString);
    expect(dateText).toBeInTheDocument();
  });

  describe('selected', () => {
    it('when listitem is selected, shows selected icon.', () => {
      const { getByLabelText } = renderElement({ ...props, isSelected: true });
      const selectedIcon = getByLabelText('selected icon');
      expect(selectedIcon).toBeInTheDocument();
    });

    it('when listitem is not selected, does not show selected icon.', () => {
      const { queryByLabelText } = renderElement({ ...props });
      const selectedIcon = queryByLabelText('selected icon');
      expect(selectedIcon).not.toBeInTheDocument();
    });
  });
});
