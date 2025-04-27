import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

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
import X from '@/shared/ui/icons/X';
import SubmitButton from '@/shared/ui/SubmitButton';

export interface Props {
  id: string;
  trigger: React.ReactNode;
  dateRange: DateRange | undefined;
  setDateRange: (dateRange: DateRange | undefined) => void;
}

const PeriodCalendarDrawer: React.FC<Props> = ({
  id,
  trigger,
  dateRange,
  setDateRange,
}) => {
  const [selected, setSelected] = useState<DateRange | undefined>(dateRange);

  return (
    <Drawer>
      <DrawerTrigger id={id}>{trigger}</DrawerTrigger>
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
        {<span></span>}
        <div className='flex flex-col w-full mx-auto items-center mt-6'>
          <Calendar
            mode='range'
            selected={selected}
            onSelect={setSelected}
            locale={ko}
            className='w-full p-0'
            classNames={{
              caption_label: 'font-[17px]',
              head_cell: 'w-[14.2857143%] font-normal',
              row: 'flex w-full mt-0',
              cell: 'w-[14.2857143%] aspect-square',
              day: 'h-full w-full rounded-full font-[15px] hover:bg-[#89f336]/50',
              day_selected: 'bg-[#89f336] text-[#222]',
              day_today: 'text-[#28a745]',
              day_disabled: 'text-[#999999]',
            }}
            formatters={{
              formatCaption: (month) =>
                format(month, 'yyyy년 M월', { locale: ko }),
            }}
          />
          <DrawerFooter className='flex flex-row items-center w-full pb-0 pt-4 px-auto'>
            <Button
              type='button'
              className='text-[15px] text-[#555555] font-semibold'
              variant='ghost'
              onClick={() => {
                setDateRange(undefined);
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
                  setDateRange(selected);
                }}
              />
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PeriodCalendarDrawer;
