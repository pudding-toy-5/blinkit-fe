import Period from '@/features/expense/model/types/Period';

import SelectMonthListItem from './SelectMonthListItem';
export interface SelectMonthListProps {
  period: Period;
  onSetPeriod: (newPeriod: Period) => void;
}

const SelectMonthList: React.FC<SelectMonthListProps> = ({
  period,
  onSetPeriod,
}) => {
  const periods: Period[] = [
    { year: 2025, month: 3 },
    { year: 2025, month: 2 },
    { year: 2025, month: 1 },
    { year: 2024, month: 12 },
    { year: 2024, month: 11 },
    { year: 2024, month: 10 },
  ];

  const handleClickMonth = (newPeriod: Period) => {
    onSetPeriod(newPeriod);
  };

  return (
    <ul className='list-none flex flex-col gap-6'>
      {periods.map(({ year, month }) => (
        <SelectMonthListItem
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
