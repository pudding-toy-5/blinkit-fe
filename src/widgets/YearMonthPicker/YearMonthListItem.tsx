import { Button } from '@/shared/ui/atoms/button';

import type { YearMonthListItemProps } from './types';

const SelectMonthListItem: React.FC<YearMonthListItemProps> = ({
  yearMonth,
  isSelected,
  handleClick,
}) => {
  const { year, month } = yearMonth;

  return (
    <li className='w-full h-6'>
      <Button
        variant='ghost'
        className='flex flex-row w-full h-full p-0 text-[15px] font-normal items-center rounded-none'
        onClick={handleClick}
      >
        <p className='mr-auto p-0'>
          {year}년 {month}월
        </p>
        {isSelected && (
          <div aria-label='selected icon'>
            <svg
              className='size-6 h-full'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M21 7.28599L10.4319 17.373C10.2483 17.5483 9.99731 17.6471 9.73541 17.6471C9.4735 17.6471 9.22256 17.5483 9.03891 17.373L3 11.609L4.39299 10.323L9.73541 15.4223L19.607 6L21 7.28599Z'
                fill='#28A745'
              />
            </svg>
          </div>
        )}
      </Button>
    </li>
  );
};

export default SelectMonthListItem;
