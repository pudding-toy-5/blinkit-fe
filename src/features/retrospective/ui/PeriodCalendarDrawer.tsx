import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

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
import X from '@/shared/ui/icons/X';
import { cn } from '@/shared/ui/styles/utils';
import SubmitButton from '@/shared/ui/SubmitButton';

export interface Props {
  trigger: React.ReactNode;
  dateRange: DateRange | undefined;
  setDateRange: (dateRange: DateRange | undefined) => void;
}

const PeriodCalendarDrawer: React.FC<Props> = ({
  trigger,
  dateRange,
  setDateRange,
}) => {
  const [selected, setSelected] = useState<DateRange | undefined>(dateRange);

  useEffect(() => {
    setSelected(dateRange);
  }, [dateRange]);

  return (
    <Drawer>
      <DrawerTrigger>{trigger}</DrawerTrigger>
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
        {selected && (
          <div className='w-full flex items-center justify-center mt-2'>
            <span className='text-[15px] text-[#28a745]'>
              {formatDateRange(selected)}
            </span>
          </div>
        )}
        <div className='flex flex-col w-full mx-auto items-center mt-4'>
          <Calendar
            mode='range'
            selected={selected}
            onSelect={setSelected}
            locale={ko}
            defaultMonth={selected?.to}
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
                setSelected(undefined);
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
