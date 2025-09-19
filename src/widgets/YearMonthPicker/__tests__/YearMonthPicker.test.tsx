import { fireEvent, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import YearMonth from '@/shared/model/YearMonth';

import type { YearMonthPickerProps } from '../types';
import YearMonthPicker from '../YearMonthPicker';

describe('YearMonthPicker', () => {
  const current = new Date();
  const currentYearMonth: YearMonth = {
    year: current.getFullYear(),
    month: current.getMonth() + 1,
  };

  const props: YearMonthPickerProps = {
    value: { ...currentYearMonth },
    onChange: vi.fn(),
  };

  const renderElement = ({ value, onChange }: YearMonthPickerProps) =>
    render(<YearMonthPicker value={value} onChange={onChange} />);

  // drawer header
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

  it('when listitem is selected, calls onChange with selected yearMonth.', () => {
    const onSetYearMonth = vi.fn();
    const { getByRole, getByText } = renderElement({
      ...props,
      onChange: onSetYearMonth,
    });

    const trigger = getByRole('button');
    fireEvent.click(trigger);

    const today = new Date();
    const monthButton = getByText(
      `${today.getFullYear().toString()}년 ${(today.getMonth() + 1).toString()}월`
    );

    expect(monthButton).toBeInTheDocument();
    fireEvent.click(monthButton);

    expect(onSetYearMonth).toBeCalledWith({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
    });
  });
});
