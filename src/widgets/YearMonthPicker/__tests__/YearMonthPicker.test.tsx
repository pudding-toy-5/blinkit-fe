import { fireEvent, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import YearMonth from '@/shared/model/YearMonth';

import type { YearMonthPickerProps } from '../YearMonthPicker';
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

    // opening drawer
    const triggerButton = getByRole('button', {
      name: `${currentMonth.toString()}월`,
    });
    fireEvent.click(triggerButton);

    // checking title
    const title = getByText(titleText);
    expect(title).toBeInTheDocument();
    expect(title.tagName.toLowerCase()).toBe('h2');

    // checking close button
    const closeButton = getByLabelText('close button');
    expect(closeButton).toBeInTheDocument();
  });

  it('when listitem is selected, calls onChange with selected yearMonth.', () => {
    const onChange = vi.fn();
    const { getByRole, getByText } = renderElement({
      ...props,
      onChange: onChange,
    });

    const triggerButton = getByRole('button', {
      name: `${currentMonth.toString()}월`,
    });
    fireEvent.click(triggerButton);

    const monthButton = getByText(
      `${currentYear.toString()}년 ${currentMonth.toString()}월`
    );

    expect(monthButton).toBeInTheDocument();
    fireEvent.click(monthButton);

    expect(onChange).toBeCalledWith({
      year: currentYear,
      month: currentMonth,
    });
  });
});
