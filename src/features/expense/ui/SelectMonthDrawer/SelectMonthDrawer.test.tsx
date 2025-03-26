import { describe, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

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
    const { getByRole, getByText, queryByTitle } = renderElement({
      ...props,
    });

    expect(queryByTitle(titleText)).not.toBeInTheDocument();

    const trigger = getByRole('button');
    fireEvent.click(trigger);

    const title = getByText(titleText);
    expect(title).toBeInTheDocument();
    expect(title.tagName.toLowerCase()).toBe('h2');
  });
});
