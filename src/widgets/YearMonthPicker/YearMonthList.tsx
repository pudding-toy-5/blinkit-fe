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

  return (
    <ul className='list-none flex flex-col gap-6 max-h-60 overflow-y-auto scroll'>
      {yearMonths.map(({ year, month }) => {
        const isSameYearMonth =
          year === selected.year && month === selected.month;

        return (
          <YearMonthListItem
            key={`${year.toString()}-${month.toString()}`}
            yearMonth={{ year, month }}
            isSelected={isSameYearMonth}
            handleClick={() => {
              onSelect({ year, month });
            }}
          />
        );
      })}
    </ul>
  );
};

export default YearMonthList;
