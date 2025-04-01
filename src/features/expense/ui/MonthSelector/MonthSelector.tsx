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
import ArrowLeftFilled from '@/shared/ui/icons/ArrowLeftFilled';
import ArrowRightFilled from '@/shared/ui/icons/ArrowRightFilled';

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
    <div className='flex flex-row items-center' aria-label='조회 월 선택'>
      <Button
        variant='ghost'
        size='icon'
        aria-label='이전 월로 이동'
        onClick={handleClickPrevious}
        className='size-4 mr-2'
      >
        <ArrowLeftFilled size={16} color='#222' />
      </Button>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant='ghost'
            className='h-auto p-0 text-[15px] rounded-none text-decoration-line: underline decoration-solid decoration-auto underline-offset-auto'
            style={{ textUnderlinePosition: 'from-font' }}
          >
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
        disabled={
          year === new Date().getFullYear() &&
          month === new Date().getMonth() + 1
        }
        className='size-4 ml-2'
      >
        <ArrowRightFilled size={16} color='#222' />
      </Button>
    </div>
  );
};

export default MonthSelector;
