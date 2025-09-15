import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import type { DateRange } from 'react-day-picker';

import { formatDateRange } from '@/shared/lib/dateUtils';
import { Button } from '@/shared/ui/atoms/button';
import { Calendar } from '@/shared/ui/atoms/calendar';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/atoms/drawer';
import ArrowLeft from '@/shared/ui/icons/ArrowLeft';
import X from '@/shared/ui/icons/X';
import SubmitButton from '@/shared/ui/SubmitButton';

export interface Props {
  value: DateRange | undefined;
  onChange: (dateRange: DateRange | undefined) => void;
}

const DateRangePicker: React.FC<Props> = ({ value, onChange }) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(value);

  useEffect(() => {
    setDateRange(value);
  }, [value]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          type='button'
          aria-label='기간 선택 열기'
          className='flex flex-row items-center gap-1'
        >
          <span className='text-[15px] text-[#222] font-semibold'>
            {value ? formatDateRange(value) : '전체 기간'}
          </span>
          <div className='rotate-[-90deg]'>
            <ArrowLeft size={16} color='#222' />
          </div>
        </button>
      </DrawerTrigger>
      <DrawerContent className='p-6 !rounded-t-[20px]'>
        <DrawerHeader className='flex flex-row items-center justify-between p-0'>
          <div className='flex-1' />
          <DrawerTitle>날짜 선택</DrawerTitle>
          <DrawerClose
            aria-label='close button'
            className='flex-1 flex justify-end'
          >
            <X size={24} />
          </DrawerClose>
        </DrawerHeader>
        {dateRange ? (
          <span className='text-[15px] font-normal text-[#28A745] text-center mt-2'>
            {formatDateRange(dateRange)}
          </span>
        ) : null}
        <div className='flex flex-col w-full mx-auto items-center mt-4'>
          <Calendar
            mode='range'
            selected={dateRange}
            onSelect={setDateRange}
            locale={ko}
            className='w-full p-0'
            classNames={{
              caption_label: 'text-[17px]',
              head_cell: 'w-[14.2857143%] font-normal',
              row: 'flex w-full mt-0',
              cell: 'w-[14.2857143%] aspect-square',
              day: 'h-full w-full rounded-full font-[15px] hover:bg-[#89f336]/50',
              day_selected: 'bg-[#89f336] text-[#222]',
              day_today: 'text-[#28a745]',
              day_disabled: 'text-[#999999]',
            }}
            disabled={{ after: new Date() }}
            formatters={{
              formatCaption: (month) =>
                format(month, 'yyyy년 M월', { locale: ko }),
            }}
          />
          <DrawerFooter className='flex flex-row items-center w-full pb-0 pt-4 mx-auto'>
            <Button
              type='button'
              className='text-[15px] text-[#555555] font-semibold'
              variant='ghost'
              onClick={() => {
                onChange(undefined);
              }}
            >
              재설정
            </Button>
            <DrawerClose asChild className='flex-1' aria-label='날짜 선택 버튼'>
              <SubmitButton
                text='선택'
                state='default'
                className='text-[15px]'
                onClick={() => {
                  onChange(dateRange);
                }}
              />
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DateRangePicker;
