import { Dialog } from '@radix-ui/react-dialog';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import YearMonth from '@/shared/model/YearMonth';

import type { YearMonthTriggerProps } from '../types';
import YearMonthTrigger from '../YearMonthTrigger';

describe('YearMonthTrigger', () => {
  const current = new Date();
  const currentYearMonth: YearMonth = {
    year: current.getFullYear(),
    month: current.getMonth() + 1,
  };

  const renderElement = ({ yearMonth }: YearMonthTriggerProps) =>
    render(
      <Dialog open={true}>
        <YearMonthTrigger yearMonth={yearMonth} />
      </Dialog>
    );

  it('when yearMonth year is current year, renders only month.', () => {
    const { getByRole } = renderElement({
      yearMonth: currentYearMonth,
    });

    const trigger = getByRole('button');
    expect(trigger).toBeInTheDocument();
    expect(trigger).not.toHaveTextContent(currentYearMonth.year.toString());
    expect(trigger).toHaveTextContent(currentYearMonth.month.toString() + '월');
  });

  it('when yearMonth year is not current year, renders year + month.', () => {
    const pastYearMonth: YearMonth = {
      ...currentYearMonth,
      year: currentYearMonth.year - 1,
    };

    const { getByRole } = renderElement({
      yearMonth: pastYearMonth,
    });

    const trigger = getByRole('button');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent(`${pastYearMonth.year.toString()}년 `);
    expect(trigger).toHaveTextContent(`${pastYearMonth.month.toString()}월`);
  });
});
