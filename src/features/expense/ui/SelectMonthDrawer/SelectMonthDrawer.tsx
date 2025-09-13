import { X } from 'lucide-react';

import YearMonth from '@/shared/model/YearMonth';
import { Button } from '@/shared/ui/atoms/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/atoms/drawer';

import SelectMonthList from '../SelectMonthList';

export interface SelectMonthDrawerProps {
  yearMonth: YearMonth;
  onSetYearMonth: (newYearMonth: YearMonth) => void;
}

const SelectMonthDrawer: React.FC<SelectMonthDrawerProps> = ({
  yearMonth,
  onSetYearMonth,
}) => {
  const { year, month } = yearMonth;
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant='ghost'
          className='h-auto p-0 text-[15px] min-w-[22px] rounded-none text-decoration-line: underline decoration-solid decoration-auto underline-offset-auto tabular-nums'
          style={{ textUnderlinePosition: 'from-font' }}
        >
          {year !== new Date().getFullYear() && `${year.toString()}년 `}
          {month}월
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className='py-6 px-5'
        style={{ borderRadius: '20px 20px 0 0 ' }}
      >
        <DrawerHeader className='flex flex-row items-center justify-between p-0'>
          <div className='flex-1' />
          <DrawerTitle className='font-[17px]'>조회 월 선택</DrawerTitle>
          <DrawerClose className='flex-1 flex justify-end'>
            <div role='button' aria-label='close button'>
              <X />
            </div>
          </DrawerClose>
        </DrawerHeader>
        <div className='items-center mt-8'>
          <SelectMonthList
            yearMonth={yearMonth}
            onSetYearMonth={onSetYearMonth}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SelectMonthDrawer;
