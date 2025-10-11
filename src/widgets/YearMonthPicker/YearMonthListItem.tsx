import { formatInTimeZone } from 'date-fns-tz';

import { Button } from '@/shared/ui/atoms/button';

export interface YearMonthListItemProps {
  date: Date;
  isSelected: boolean;
  onClick: () => void;
}

const YearMonthListItem: React.FC<YearMonthListItemProps> = ({
  date,
  isSelected,
  onClick,
}) => {
  return (
    <li className='w-full h-6'>
      <button
        className='flex flex-row w-full h-full p-0 text-[15px] font-normal items-center rounded-none'
        onClick={onClick}
      >
        <p className='mr-auto p-0'>
          {formatInTimeZone(date, 'Asia/Seoul', 'yyyy년 M월')}
        </p>
        {isSelected && (
          <svg
            aria-label='selected icon'
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
        )}
      </button>
    </li>
  );
};

export default YearMonthListItem;
