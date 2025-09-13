import { fireEvent, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import YearMonth from '@/shared/model/YearMonth';

import SelectMonthDrawer, { SelectMonthDrawerProps } from './SelectMonthDrawer';

describe('SelectMonthDrawer', () => {
  const current = new Date();
  const currentYearMonth: YearMonth = {
    year: current.getFullYear(),
    month: current.getMonth() + 1,
  };

  const props: SelectMonthDrawerProps = {
    yearMonth: { ...currentYearMonth },
    onSetYearMonth: vi.fn(),
  };

  const renderElement = ({
    yearMonth,
    onSetYearMonth,
  }: SelectMonthDrawerProps) =>
    render(
      <SelectMonthDrawer
        yearMonth={yearMonth}
        onSetYearMonth={onSetYearMonth}
      />
    );

  describe('drawer trigger', () => {
    it('when yearMonth year is current year, renders month.', () => {
      const { getByRole } = renderElement({
        ...props,
      });

      const trigger = getByRole('button');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveTextContent(
        props.yearMonth.month.toString() + '월'
      );
    });

    it('when yearMonth year is not current year, renders year + month.', () => {
      const newYearMonth: YearMonth = {
        ...currentYearMonth,
        year: currentYearMonth.year - 1,
      };
      const { getByRole } = renderElement({
        ...props,
        yearMonth: { ...newYearMonth },
      });

      const trigger = getByRole('button');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveTextContent(
        `${newYearMonth.year.toString()}년 ${props.yearMonth.month.toString()}월`
      );
    });
  });

  it('when trigger button is clicked, renders title and close button.', () => {
    const titleText = '조회 월 선택';
    const { getByRole, getByText, queryByTitle, getByLabelText } =
      renderElement({
        ...props,
      });

    expect(queryByTitle(titleText)).not.toBeInTheDocument();

    const trigger = getByRole('button');
    fireEvent.click(trigger);

    const title = getByText(titleText);
    expect(title).toBeInTheDocument();
    expect(title.tagName.toLowerCase()).toBe('h2');

    const closeButton = getByLabelText('close button');
    expect(closeButton).toBeInTheDocument();
  });

  it('when month is selected, calls onSetPeriod with selected period.', () => {
    const onSetPeriod = vi.fn();
    const { getByRole, getByText } = renderElement({
      ...props,
      onSetPeriod: onSetPeriod,
    });

    const trigger = getByRole('button');
    fireEvent.click(trigger);

    const today = new Date();
    const monthButton = getByText(
      `${today.getFullYear().toString()}년 ${(today.getMonth() + 1).toString()}월`
    );

    expect(monthButton).toBeInTheDocument();
    fireEvent.click(monthButton);

    expect(onSetPeriod).toBeCalledWith({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
    });
  });
});
