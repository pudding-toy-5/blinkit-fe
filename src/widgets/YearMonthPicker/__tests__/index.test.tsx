import { fireEvent, render } from '@testing-library/react';

import YearMonthPicker, { YearMonthPickerProps } from '../index';

describe('YearMonthPicker', () => {
  const current = new Date();
  const minDate = new Date();
  minDate.setFullYear(current.getFullYear() - 5);

  const props: YearMonthPickerProps = { value: current, onChange: vi.fn() };

  const renderElement = ({ value, onChange }: YearMonthPickerProps) =>
    render(<YearMonthPicker value={value} onChange={onChange} />);

  describe('Previous Button', () => {
    it('is disabled when value date is same minDate year and month.', () => {
      const { getByRole } = renderElement({ ...props, value: minDate });

      const previousButton = getByRole('button', { name: '이전 월로 이동' });
      expect(previousButton).toBeDisabled();
    });

    it('is activated when value date is not same minDate year and month.', () => {
      const { getByRole } = renderElement({ ...props });

      const previousButton = getByRole('button', { name: '이전 월로 이동' });
      expect(previousButton).not.toBeDisabled();
    });

    it('when clicked, calls onChange with date object minus one month', () => {
      const { getByRole } = renderElement({ ...props });

      const previousButton = getByRole('button', { name: '이전 월로 이동' });

      fireEvent.click(previousButton);
      expect(props.onChange).toBeCalledWith(
        new Date(props.value.getMonth() - 1)
      );
    });
  });

  describe('Next Button', () => {
    it('is disabled when value date is same minDate year and month.', () => {
      const { getByRole } = renderElement({ ...props });

      const nextButton = getByRole('button', { name: '다음 월로 이동' });
      expect(nextButton).toBeDisabled();
    });

    it('is activated when value date is not same minDate year and month.', () => {
      const { getByRole } = renderElement({
        ...props,
        value: new Date(new Date().getMonth() - 1),
      });

      const nextButton = getByRole('button', { name: '다음 월로 이동' });
      expect(nextButton).not.toBeDisabled();
    });

    it('when clicked, calls onChange with nextMonth.', () => {
      const value = new Date(new Date().getMonth() - 1);
      const { getByRole } = renderElement({
        ...props,
        value,
      });

      const nextButton = getByRole('button', { name: '다음 월로 이동' });
      fireEvent.click(nextButton);
      expect(props.onChange).toBeCalledWith(new Date(value.getMonth() + 1));
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
    it('when drawerTrigger is not clicked, does not show drawerContent.', () => {});

    it('when drawerTrigger is clicked, shows drawerContent.', () => {});

    describe('drawerHeader', () => {});
  });
});
