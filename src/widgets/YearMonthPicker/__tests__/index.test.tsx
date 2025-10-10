import { fireEvent, render } from '@testing-library/react';

import YearMonthPicker, { YearMonthPickerProps } from '../index';
import { YearMonthListProps } from '../YearMonthList';

const yearMonthListTestId = 'mock-select-btn';
const selectedDate = new Date(2025, 9, 1);

vi.mock('../YearMonthList', () => {
  return {
    default: (props: YearMonthListProps) => (
      <button
        data-testid={yearMonthListTestId}
        onClick={() => {
          props.onSelect(selectedDate);
        }}
      />
    ),
  };
});

describe('YearMonthPicker', () => {
  const currentDate = new Date();
  const current = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const minDate = new Date(current);
  minDate.setFullYear(current.getFullYear() - 5);

  const props: YearMonthPickerProps = { value: current, onChange: vi.fn() };

  const renderElement = ({ value, onChange }: YearMonthPickerProps) =>
    render(<YearMonthPicker value={value} onChange={onChange} />);

  describe('Previous Button', () => {
    it('is disabled when value date is same as current date (minDate) year and month.', () => {
      const { getByRole } = renderElement({ ...props, value: minDate });

      const previousButton = getByRole('button', { name: '이전 월로 이동' });
      expect(previousButton).toBeDisabled();
    });

    it('is activated when value date is after minDate and before maxDate.', () => {
      const { getByRole } = renderElement({ ...props });

      const previousButton = getByRole('button', { name: '이전 월로 이동' });
      expect(previousButton).not.toBeDisabled();
    });

    it('when clicked, calls onChange with previousMonth', () => {
      const previousDate = new Date(
        current.getFullYear(),
        current.getMonth() - 1,
        current.getDate()
      );
      const { getByRole } = renderElement({ ...props, value: current });

      const previousButton = getByRole('button', { name: '이전 월로 이동' });

      fireEvent.click(previousButton);
      expect(props.onChange).toBeCalledWith(previousDate);
    });
  });

  describe('Next Button', () => {
    it('is disabled when value date is same as current date (maxDate) year and month.', () => {
      const { getByRole } = renderElement({ ...props });

      const nextButton = getByRole('button', { name: '다음 월로 이동' });
      expect(nextButton).toBeDisabled();
    });

    it('is activated when value date is after minDate and before maxDate', () => {
      const { getByRole } = renderElement({
        ...props,
        value: new Date(
          current.getFullYear(),
          current.getMonth() - 1,
          current.getDate()
        ),
      });

      const nextButton = getByRole('button', { name: '다음 월로 이동' });
      expect(nextButton).not.toBeDisabled();
    });

    it('when clicked, calls onChange with nextMonth.', () => {
      const value = new Date(
        current.getFullYear(),
        current.getMonth() - 1,
        current.getDate()
      );

      const { getByRole } = renderElement({
        ...props,
        value,
      });

      const nextButton = getByRole('button', { name: '다음 월로 이동' });
      fireEvent.click(nextButton);
      expect(props.onChange).toBeCalledWith(current);
    });
  });

  describe('drawerTrigger', () => {
    it('when value year is current year, trigger renders only month.', () => {
      const { getByRole } = renderElement({ ...props });

      const trigger = getByRole('button', {
        name: `${(props.value.getMonth() + 1).toString()}월`,
      });
      expect(trigger).toBeInTheDocument();
    });

    it('when value year is not current year, trigger renders year and month.', () => {
      const { getByRole } = renderElement({ ...props, value: minDate });

      const year = minDate.getFullYear().toString();
      const month = (minDate.getMonth() + 1).toString();

      const trigger = getByRole('button', {
        name: `${year}년 ${month}월`,
      });
      expect(trigger).toBeInTheDocument();
    });
  });

  describe('drawerContent', () => {
    const drawerContentAltText = '조회 월 선택 드로어';

    it('when drawerTrigger is not clicked, does not show drawerContent.', () => {
      const { queryByAltText } = renderElement({ ...props });

      expect(queryByAltText(drawerContentAltText)).not.toBeInTheDocument();
    });

    it('when drawerTrigger is clicked, shows drawerContent.', () => {
      const { getByRole, getByLabelText } = renderElement({ ...props });

      const trigger = getByRole('button', {
        name: `${(props.value.getMonth() + 1).toString()}월`,
      });

      expect(trigger).toBeInTheDocument();
      fireEvent.click(trigger);

      const drawerContent = getByLabelText(drawerContentAltText);
      expect(drawerContent).toBeInTheDocument();
    });

    describe('YearMonthList onSelect', () => {
      it('when YearMonthList calls onSelect, calls onChange.', () => {
        const { getByRole, getByLabelText, getByTestId } = renderElement({
          ...props,
        });

        const trigger = getByRole('button', {
          name: `${(props.value.getMonth() + 1).toString()}월`,
        });

        expect(trigger).toBeInTheDocument();
        fireEvent.click(trigger);

        const drawerContent = getByLabelText(drawerContentAltText);
        expect(drawerContent).toBeInTheDocument();

        const yearMonthListBtn = getByTestId(yearMonthListTestId);
        expect(yearMonthListBtn).toBeInTheDocument();
        fireEvent.click(yearMonthListBtn);

        expect(props.onChange).toBeCalledWith(selectedDate);
      });
    });
  });
});
