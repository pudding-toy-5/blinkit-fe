import YearMonth from '@/shared/model/YearMonth';

import type { YearMonthListProps } from './types';
import YearMonthListItem from './YearMonthListItem';

const YearMonthList: React.FC<YearMonthListProps> = ({
  selected,
  onSelect,
}) => {
  const getYearMonthRange = (start: Date, end: Date): YearMonth[] => {
    const result: YearMonth[] = [];
    const current = new Date(start.getFullYear(), start.getMonth());

    while (current <= end) {
      const year = current.getFullYear();
      const month = current.getMonth() + 1;
      result.push({ year, month });

      current.setMonth(current.getMonth() + 1);
    }

    return result;
  };

  const today = new Date();
  const start = new Date(today.getFullYear() - 5, today.getMonth());
  const end = new Date(today.getFullYear(), today.getMonth());

  const yearMonths: YearMonth[] = getYearMonthRange(start, end).reverse();

  const handleClickMonth = (newYearMonth: YearMonth) => {
    onSelect(newYearMonth);
  };

  return (
    <ul className='list-none flex flex-col gap-6 max-h-60 overflow-y-auto scroll'>
      {yearMonths.map(({ year, month }) => {
        const isSameYearMonth =
          year === yearMonth.year && month === yearMonth.month;

        return (
          <SelectMonthListItem
            key={`${year.toString()}-${month.toString()}`}
            year={year}
            month={month}
            selected={isSameYearMonth}
            handleClick={handleClickMonth}
          />
        );
      })}
    </ul>
  );
};

export default YearMonthList;
