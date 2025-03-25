import { X } from 'lucide-react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

export interface SelectMonthDrawerProps {
  trigger: React.ReactNode;
}

const SelectMonthDrawer: React.FC<SelectMonthDrawerProps> = ({ trigger }) => {
  return (
    <Drawer>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent className='w-full max-w-sm mx-auto p-6'>
        <DrawerHeader className='flex flex-row items-center justify-between'>
          <div className='flex-1' />
          <DrawerTitle>조회 월 선택</DrawerTitle>
          <DrawerClose className='flex-1 flex justify-end'>
            <div role='button' aria-label='close button'>
              <X />
            </div>
          </DrawerClose>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default SelectMonthDrawer;
