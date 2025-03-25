import { ko } from 'date-fns/locale';
import { X } from 'lucide-react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

import SubmitButton from '@/shared/ui/SubmitButton';

export interface CalendarDrawerProps {
  date: Date | undefined;
  setDate: (newDate: Date | undefined) => void;
}

const CalendarDrawer: React.FC<CalendarDrawerProps> = ({ date, setDate }) => {
  return (
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent className='w-full max-w-sm mx-auto p-6'>
        <DrawerHeader className='flex flex-row items-center justify-between rounded-t-full p-0'>
          <div className='flex-1' />
          <DrawerTitle>날짜 선택</DrawerTitle>
          <DrawerClose className='flex-1 flex justify-end'>
            <div role='button'>
              <X />
            </div>
          </DrawerClose>
        </DrawerHeader>
        <div className='items-center mt-6'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            locale={ko}
            className='px-auto py-0'
            classNames={{
              caption_label: '17px',
              head_cell: 'w-[44px] font-normal',
              row: 'flex w-full mt-0',
              day: 'size-[44px]',
              day_selected: 'bg-[#89f336] rounded-[22px] text-[#222]',
              day_today: 'text-[#28a745]',
              day_disabled: 'text-[#999999]',
            }}
          />
          <DrawerFooter className='flex flex-row flex-center pb-0 pt-4 px-auto'>
            <Button className='font-[15px] h-13' variant='ghost'>
              오늘
            </Button>
            <DrawerClose asChild className='flex-1'>
              <SubmitButton
                text='선택'
                state='default'
                onClick={() => {
                  setDate(date);
                }}
              />
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CalendarDrawer;
