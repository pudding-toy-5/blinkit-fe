import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { usePeriod } from '@/features/expense/model/selectors';

const MonthSelector = () => {
  const period = usePeriod();
  const { year, month } = period;

  return (
    <div className='flex flex-row' aria-label='조회 월 선택'>
      <Button variant='ghost' size='icon' aria-label='이전 월로 이동'>
        <ChevronLeft />
      </Button>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='link'>
            {year !== new Date().getFullYear() && `${year.toString()}년 `}
            {month}월
          </Button>
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
