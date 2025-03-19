import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import Period from '@/features/expense/model/types/Period';

interface MonthSelectorProps {
  period: Period;
  onSetPeriod: (period: Period) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  period,
  onSetPeriod,
}) => {
  const { year, month } = period;

  const handleClickPrevious = () => {
    if (month === 1) {
      onSetPeriod({ year: year - 1, month: 12 });
    } else {
      onSetPeriod({ year, month: month - 1 });
    }
  };

  const handleClickNext = () => {
    if (month === 12) {
      onSetPeriod({ year: year + 1, month: 1 });
    } else {
      onSetPeriod({ year, month: month + 1 });
    }
  };

  return (
    <div className='flex flex-row' aria-label='조회 월 선택'>
      <Button
        variant='ghost'
        size='icon'
        aria-label='이전 월로 이동'
        onClick={handleClickPrevious}
      >
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
      <Button
        variant='ghost'
        size='icon'
        aria-label='다음 월로 이동'
        onClick={handleClickNext}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default MonthSelector;
