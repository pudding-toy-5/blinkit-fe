import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { useExpenseStore } from '@/features/expense/model/expenseStore';

const MonthSelector = () => {
  const month = useExpenseStore((state) => state.month);

  return (
    <div className='flex flex-row' aria-label='조회 월 선택'>
      <Button variant='ghost' size='icon' aria-label='이전 월로 이동'>
        <ChevronLeft />
      </Button>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='link'>{month}월</Button>
        </DrawerTrigger>
        <DrawerContent className='flex items-center'>
          <DrawerHeader>
            <DrawerTitle>조회 월 선택</DrawerTitle>
          </DrawerHeader>
          <div className='p-4'>조회 월 선택 몸통</div>
        </DrawerContent>
      </Drawer>
      <Button variant='ghost' size='icon' aria-label='다음 월로 이동'>
        <ChevronRight />
      </Button>
    </div>
  );
};

export default MonthSelector;
