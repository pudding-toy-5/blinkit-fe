import { X } from 'lucide-react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import Period from '@/features/expense/model/types/Period';

import SelectMonthList from '../SelectMonthList';

export interface SelectMonthDrawerProps {
  trigger: React.ReactNode;
  period: Period;
  onSetPeriod: (newPeriod: Period) => void;
}

const SelectMonthDrawer: React.FC<SelectMonthDrawerProps> = ({
  trigger,
  period,
  onSetPeriod,
}) => {
  return (
    <Drawer>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent
        className='w-full max-w-sm mx-auto py-6 px-5'
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
          <SelectMonthList period={period} onSetPeriod={onSetPeriod} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SelectMonthDrawer;
