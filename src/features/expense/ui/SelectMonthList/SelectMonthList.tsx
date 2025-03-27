import Period from '@/features/expense/model/types/Period';

import SelectMonthListItem from '../SelectMonthListItem';

export interface SelectMonthListProps {
  period: Period;
  onSetPeriod: (newPeriod: Period) => void;
}

const SelectMonthList: React.FC<SelectMonthListProps> = ({
  period,
  onSetPeriod,
}) => {
  const getPeriodRange = (start: Date, end: Date): Period[] => {
    const result: Period[] = [];
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
  const periods: Period[] = getPeriodRange(start, end);

  const handleClickMonth = (newPeriod: Period) => {
    onSetPeriod(newPeriod);
  };

  return (
    <ul className='list-none flex flex-col gap-6 max-h-60 overflow-y-auto'>
      {periods.reverse().map(({ year, month }) => (
        <SelectMonthListItem
          key={`${year.toString()}-${month.toString()}}`}
          year={year}
          month={month}
          selected={period.year === year && period.month === month}
          handleClick={handleClickMonth}
        />
      ))}
    </ul>
  );
};

export default SelectMonthList;
