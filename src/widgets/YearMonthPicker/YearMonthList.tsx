import { getMonthList } from '@/shared/lib/dateUtils';

import YearMonthListItem from './YearMonthListItem';

export interface YearMonthListProps {
  minDate: Date;
  maxDate: Date;
  selected: Date;
  onSelect: (date: Date) => void;
}

const YearMonthList: React.FC<YearMonthListProps> = ({
  minDate,
  maxDate,
  selected,
  onSelect,
}) => {
  const months: Date[] = getMonthList(minDate, maxDate).reverse();

  return (
    <ul className='list-none flex flex-col gap-6 max-h-60 overflow-y-auto scroll'>
      {months.map((date) => {
        const isSameYearMonth =
          date.getFullYear() === selected.getFullYear() &&
          date.getMonth() === selected.getMonth();

        const key: string =
          date.getFullYear().toString() + '-' + date.getMonth().toString();

        return (
          <YearMonthListItem
            key={key}
            date={date}
            isSelected={isSameYearMonth}
            onClick={() => {
              onSelect(date);
            }}
          />
        );
      })}
    </ul>
  );
};

export default YearMonthList;
