import { ko } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import X from '@/shared/ui/icons/X';
import SubmitButton from '@/shared/ui/SubmitButton';

export interface CalendarDrawerProps {
  id: string;
  trigger: React.ReactNode;
  date: Date | undefined;
  setDate: (newDate: Date | undefined) => void;
}

const CalendarDrawer: React.FC<CalendarDrawerProps> = ({
  id,
  trigger,
  date,
  setDate,
}) => {
  const _today = new Date();
  const today = new Date(
    _today.getFullYear(),
    _today.getMonth(),
    _today.getDate()
  );
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
        <div className='items-center mt-6'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            locale={ko}
            month={date}
            onMonthChange={setDate}
            className='px-auto py-0'
            classNames={{
              caption_label: 'font-[17px]',
              head_cell: 'w-[44px] font-normal',
              row: 'flex w-full mt-0',
              day: 'size-[44px] rounded-full font-[15px] hover:bg-[#89f336]/50',
              day_selected: 'bg-[#89f336] text-[#222]',
              day_today: 'text-[#28a745]',
              day_disabled: 'text-[#999999]',
            }}
          />
          <DrawerFooter className='flex flex-row items-center w-full pb-0 pt-4 px-auto'>
            <Button
              className='text-[15px] text-[#555555] h-13'
              variant='ghost'
              onClick={() => {
                setDate(today);
              }}
            >
              오늘
            </Button>
            <DrawerClose asChild className='flex-1' aria-label='날짜 선택 버튼'>
              <SubmitButton
                text='선택'
                state='default'
                className='text-[15px]'
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
