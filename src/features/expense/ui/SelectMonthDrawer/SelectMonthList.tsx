import { Button } from '@/components/ui/button';

import Period from '@/features/expense/model/types/Period';

interface SelectMonthListItemProps {
  year: number;
  month: number;
  selected: boolean;
  handleClick: (period: Period) => void;
}

const SelectMonthListItem: React.FC<SelectMonthListItemProps> = ({
  year,
  month,
  selected,
  handleClick,
}) => {
  return (
    <li className='w-full h-6'>
      <Button
        variant='ghost'
        className='flex flex-row w-full h-full p-0 font-[15px]'
        onClick={() => {
          handleClick({ year, month });
        }}
      >
        <p className='mr-auto'>
          {year}년 {month}월
        </p>
        <div>
          {selected && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M21 7.28599L10.4319 17.373C10.2483 17.5483 9.99731 17.6471 9.73541 17.6471C9.4735 17.6471 9.22256 17.5483 9.03891 17.373L3 11.609L4.39299 10.323L9.73541 15.4223L19.607 6L21 7.28599Z'
                fill='#28A745'
              />
            </svg>
          )}
        </div>
      </Button>
    </li>
  );
};

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
