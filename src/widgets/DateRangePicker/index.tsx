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
import SubmitButton from '@/shared/ui/SubmitButton';

export interface Props {
  trigger: React.ReactNode;
  dateRange: DateRange | undefined;
  setDateRange: (dateRange: DateRange | undefined) => void;
}

const DateRangePicker: React.FC<Props> = ({
  trigger,
  dateRange,
  setDateRange,
}) => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    dateRange
  );

  useEffect(() => {
    setSelectedRange(dateRange);
  }, [dateRange]);

  const handleClickSubmit = () => {
    setDateRange(selectedRange);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='p-5'>
          <div className='flex flex-row justify-between items-center'>
            <DrawerTitle>날짜 선택</DrawerTitle>
            <DrawerClose asChild>
              <Button variant='ghost' size='icon' className='size-5'>
                <X size={20} color='#222' />
              </Button>
            </DrawerClose>
          </div>
          <div className='flex flex-row justify-between mt-6'>
            <div className='flex flex-col gap-1'>
              <span className='text-[13px] text-[#888]'>시작일</span>
              <span className='text-[15px] text-[#222]'>
                {selectedRange?.from
                  ? format(selectedRange.from, 'yyyy년 M월 d일', { locale: ko })
                  : '-'}
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-[13px] text-[#888]'>종료일</span>
              <span className='text-[15px] text-[#222]'>
                {selectedRange?.to
                  ? format(selectedRange.to, 'yyyy년 M월 d일', { locale: ko })
                  : '-'}
              </span>
            </div>
          </div>
        </DrawerHeader>
        <div className='p-5'>
          <Calendar
            mode='range'
            selected={selectedRange}
            onSelect={setSelectedRange}
            numberOfMonths={2}
            defaultMonth={selectedRange?.from}
          />
        </div>
        <DrawerFooter className='p-5'>
          <SubmitButton onClick={handleClickSubmit}>
            {formatDateRange(selectedRange)}
          </SubmitButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DateRangePicker;
