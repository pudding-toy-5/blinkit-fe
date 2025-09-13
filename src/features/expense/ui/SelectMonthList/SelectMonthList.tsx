import YearMonth from '@/shared/model/YearMonth';

import SelectMonthListItem from '../SelectMonthListItem';

export interface SelectMonthListProps {
  yearMonth: YearMonth;
  onSetYearMonth: (newYearMonth: YearMonth) => void;
}

const SelectMonthList: React.FC<SelectMonthListProps> = ({
  yearMonth,
  onSetYearMonth,
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
  const yearMonths: YearMonth[] = getYearMonthRange(start, end);

  const handleClickMonth = (newYearMonth: YearMonth) => {
    onSetYearMonth(newYearMonth);
  };

  return (
    <ul className='list-none flex flex-col gap-6 max-h-60 overflow-y-auto scroll'>
      {yearMonths.reverse().map(({ year, month }) => (
        <SelectMonthListItem
          key={`${year.toString()}-${month.toString()}`}
          year={year}
          month={month}
          selected={yearMonth.year === year && yearMonth.month === month}
          handleClick={handleClickMonth}
        />
      ))}
    </ul>
  );
};

export default SelectMonthList;
