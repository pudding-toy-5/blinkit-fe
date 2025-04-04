import { fireEvent, getByLabelText, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import SelectMonthDrawer, { SelectMonthDrawerProps } from './SelectMonthDrawer';

describe('SelectMonthDrawer', () => {
  const props: SelectMonthDrawerProps = {
    trigger: 'trigger-text',
    period: { year: 2025, month: 1 },
    onSetPeriod: vi.fn(),
  };

  const renderElement = ({
    trigger,
    period,
    onSetPeriod,
  }: SelectMonthDrawerProps) =>
    render(
      <SelectMonthDrawer
        trigger={trigger}
        period={period}
        onSetPeriod={onSetPeriod}
      />
    );

  it('renders drawer trigger.', () => {
    const { getByRole } = renderElement({ ...props });

    const trigger = getByRole('button');
    expect(trigger).toBeInTheDocument();
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
    expect(closeButton.tagName.toLowerCase()).toBe('button');
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
