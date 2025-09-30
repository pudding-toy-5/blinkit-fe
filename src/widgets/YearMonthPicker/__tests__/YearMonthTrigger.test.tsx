import { Dialog } from '@radix-ui/react-dialog';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import type { YearMonthTriggerProps } from '../YearMonthTrigger';
import YearMonthTrigger from '../YearMonthTrigger';

describe('YearMonthTrigger', () => {
  const current = new Date();
  const currentYear = current.getFullYear();
  const currentMonth = current.getMonth();

  const renderElement = ({ year, month }: YearMonthTriggerProps) =>
    render(
      <Dialog open={true}>
        <YearMonthTrigger year={year} month={month} />
      </Dialog>
    );

  it('when yearMonth year is current year, renders only month.', () => {
    const { getByRole } = renderElement({
      year: currentYear,
      month: currentMonth,
    });

    const triggerButton = getByRole('button');
    expect(triggerButton).toBeInTheDocument();
    expect(triggerButton).not.toHaveTextContent(currentYear.toString());
    expect(triggerButton).toHaveTextContent(currentMonth.toString() + '월');
  });

  it('when yearMonth year is not current year, renders year + month.', () => {
    const pastYear = currentYear - 1;
    const { getByRole } = renderElement({
      year: pastYear,
      month: currentMonth,
    });

    const triggerButton = getByRole('button');
    expect(triggerButton).toBeInTheDocument();
    expect(triggerButton).toHaveTextContent(
      `${pastYear.toString()}년 ${currentMonth.toString()}월`
    );
  });
});
